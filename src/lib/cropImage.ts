// lib/cropImage.ts (or wherever you have it)
import { Area } from "react-easy-crop";

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Important for loading external images
    image.src = url;
  });

export default async function getCroppedBlob(
  imageSrc: string,
  pixelCrop: Area,
): Promise<{ imageBlob: Blob; imageUrl: string } | undefined> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return undefined;
  }

  // Set the canvas size to the exact size of the cropped image
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Use the 9-argument version of drawImage to crop the source image
  // and draw it onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x, // The X coordinate to start clipping from the source image
    pixelCrop.y, // The Y coordinate to start clipping from the source image
    pixelCrop.width, // The width of the clipped image
    pixelCrop.height, // The height of the clipped image
    0, // The X coordinate where to place the image on the canvas
    0, // The Y coordinate where to place the image on the canvas
    pixelCrop.width, // The width of the image to use (stretch or reduce)
    pixelCrop.height, // The height of the image to use (stretch or reduce)
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });

  if (blob) {
    const imageUrl = URL.createObjectURL(blob);
    return { imageBlob: blob, imageUrl };
  }
}
