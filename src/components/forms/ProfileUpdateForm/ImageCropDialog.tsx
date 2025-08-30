"use client";
import { useEffect, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getCroppedBlob from "@/lib/cropImage";

interface ImageCropDialogProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  image: string;
  setImageData: ({
    imageUrl,
    imageBlob,
  }: {
    imageUrl: string;
    imageBlob: Blob;
  }) => void;
}

const ImageCropDialog = ({
  isOpen,
  setOpen,
  image,
  setImageData,
}: ImageCropDialogProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedBlob(image, croppedAreaPixels);
      if (croppedImage) {
        setImageData({
          imageBlob: croppedImage.imageBlob,
          imageUrl: croppedImage.imageUrl,
        });
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [isOpen, image]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="w-min">
        <DialogHeader>
          <DialogTitle>Resize Avatar</DialogTitle>
        </DialogHeader>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="relative flex h-60 w-60 items-center justify-center overflow-hidden rounded-md md:h-72 md:w-72">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <Button onClick={handleConfirm}>Set Avatar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
