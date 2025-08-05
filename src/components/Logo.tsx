"use client";
import Image from "next/image";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import CustomLink from "./CustomLink";
import LocationLink from "./LocationLink";

interface logoProps {
  className?: string;
  href: string;
}
const Logo = ({ className, href }: logoProps) => {
  const pathname = usePathname();
  if (pathname == "/")
    return (
      <CustomLink
        href={href}
        className={cn(
          "relative h-6 w-16 min-w-16 md:h-10 md:w-28 md:min-w-28 lg:h-12 lg:w-32 lg:min-w-32",
          className,
        )}
      >
        <Image
          src={"/assets/time_logo_full.png"}
          alt="time delivery logo"
          fill
        />
      </CustomLink>
    );

  return (
    <LocationLink
      href={href}
      className={cn(
        "relative h-6 w-16 min-w-16 md:h-10 md:w-28 md:min-w-28 lg:h-12 lg:w-32 lg:min-w-32",
        className,
      )}
    >
      <Image src={"/assets/time_logo_full.png"} alt="time delivery logo" fill />
    </LocationLink>
  );
};

export default Logo;
