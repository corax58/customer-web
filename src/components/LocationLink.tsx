"use client";
import React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";
import { buildUrlSearchParams } from "@/lib/utils";

import CustomLink from "./CustomLink";

interface LocationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
const LocationLink = ({ href, children, className }: LocationLinkProps) => {
  const { location } = useLocation();
  const { user } = useAuth();

  const params = buildUrlSearchParams({
    lat: location?.latitude.toString(),
    lon: location?.longitude.toString(),
  });
  const queryString = user ? "" : params.toString();
  const url = href + `${queryString ? `?${queryString}` : ``}`;
  return (
    <CustomLink href={url} className={className}>
      {children}
    </CustomLink>
  );
};

export default LocationLink;
