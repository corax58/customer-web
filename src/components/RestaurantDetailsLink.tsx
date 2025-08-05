"use client";
import React from "react";

import { usePathname } from "@/i18n/navigation";

import CustomLink from "./CustomLink";
import LocationLink from "./LocationLink";

interface RestaurantDetailsLinkProps {
  restaurantId: number;
  children: React.ReactNode;
  className?: string;
}

const RestaurantDetailsLink = ({
  restaurantId,
  children,
  className,
}: RestaurantDetailsLinkProps) => {
  const pathname = usePathname();

  if (pathname == "/")
    return (
      <CustomLink href={`/restaurants/${restaurantId}`} className={className}>
        {children}
      </CustomLink>
    );

  return (
    <LocationLink href={`/restaurants/${restaurantId}`} className={className}>
      {children}
    </LocationLink>
  );
};

export default RestaurantDetailsLink;
