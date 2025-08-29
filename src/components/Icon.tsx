// components/ui/icon.tsx

import { clsx } from "clsx";
import { type LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  as: React.ElementType;

  isDirectional?: boolean;
}

export const Icon = ({
  as: IconComponent,
  isDirectional = false,
  className,
  ...props
}: IconProps) => {
  return (
    <IconComponent
      className={clsx(
        "h-5 w-5", // Default size, can be overridden by props
        { "transition-transform rtl:-scale-x-100": isDirectional },
        className,
      )}
      {...props}
    />
  );
};
