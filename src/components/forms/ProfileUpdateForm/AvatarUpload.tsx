"use client";
import React, { useRef, useState } from "react";

import { Camera, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ImageCropDialog from "./ImageCropDialog";

interface AvatarUploadProps {
  imageData: {
    imageUrl: string;
    imageBlob?: Blob | undefined;
  } | null;
  setImageData: ({
    imageUrl,
    imageBlob,
  }: {
    imageUrl: string;
    imageBlob: Blob;
  }) => void;
}
const AvatarUpload = ({ imageData, setImageData }: AvatarUploadProps) => {
  const [image, setImage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setOpen] = useState(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        if (typeof reader.result == "string") {
          setImage(reader.result);
          setOpen(true);
        }
      };
    }
  };

  return (
    <div className="relative flex justify-center">
      <Avatar className="size-32">
        <AvatarImage src={imageData?.imageUrl} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>

      <ImageCropDialog
        setOpen={setOpen}
        isOpen={isOpen}
        image={image}
        setImageData={setImageData}
      />
      <button
        className="bg-primary absolute -bottom-3 flex size-10 items-center justify-center rounded-full p-2"
        onClick={() => {
          if (inputRef.current !== null) inputRef.current.click();
        }}
        type="button"
      >
        <Camera className="text-white" size={16} />
      </button>
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default AvatarUpload;
