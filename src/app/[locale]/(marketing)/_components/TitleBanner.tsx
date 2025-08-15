import React from "react";

import { cn } from "@/lib/utils";

interface TitleBannerProps {
  title: string;
  className?: string;
}
const TitleBanner = ({ title, className }: TitleBannerProps) => {
  return (
    <div className="h-72 w-full bg-[url('/assets/images/banner.jpg')] bg-cover">
      <div
        className={cn("flex h-full w-full items-center bg-black/50", className)}
      >
        <p className="content-container text-4xl font-bold text-white md:text-5xl">
          {title}
        </p>
      </div>
    </div>
  );
};

export default TitleBanner;
