import Image from "next/image";

import { cn } from "@/lib/utils";

interface logoProps {
  className?: string;
}

const Logo = ({ className }: logoProps) => {
  return (
    <div
      className={cn(
        "relative h-6 w-16 min-w-16 md:h-10 md:w-28 md:min-w-28 lg:h-12 lg:w-32 lg:min-w-32",
        className,
      )}
    >
      <Image src={"/assets/time_logo_full.png"} alt="time delivery logo" fill />
    </div>
  );
};

export default Logo;
