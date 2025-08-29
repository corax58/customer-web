"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  thumbnailClassName?: string;
}

export default function ImageViewer({
  src,
  alt,
  className = "",
  thumbnailClassName = "",
}: ImageViewerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Handle ESC key to close full screen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFullScreen]);

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      {/* Thumbnail Image */}
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`cursor-pointer rounded-lg transition-transform hover:scale-105 ${thumbnailClassName}`}
        onClick={openFullScreen}
      />

      {/* Full Screen Modal */}

      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeFullScreen}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute end-4 top-4 z-10 text-white hover:bg-white/20"
            onClick={closeFullScreen}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close image viewer</span>
          </Button>

          {/* Full Screen Image */}
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-all duration-300 ${className}`}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Instructions */}
          <div className="absolute start-1/2 bottom-4 -translate-x-1/2 transform text-sm text-white/70">
            Press ESC or click outside to close
          </div>
        </div>
      )}
    </>
  );
}
