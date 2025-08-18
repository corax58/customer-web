import React from "react";

import { Card, CardContent } from "@/components/ui/card";

const PopularRestaurantCardSkeleton = () => {
  return (
    <Card className="w-96 overflow-hidden rounded-4xl border-neutral-900 bg-neutral-800 p-0">
      <CardContent className="animate-pulse space-y-5 p-0">
        <div className="bg-muted aspect-[4/2] w-full" />

        <div className="space-y-4 p-4">
          <div className="bg-muted h-6 w-3/4 rounded-md" />
          <div className="space-y-2">
            <div className="bg-muted h-4 w-5/6 rounded-md" />
            <div className="bg-muted h-4 w-full rounded-md" />
            <div className="bg-muted h-4 w-4/5 rounded-md" />
          </div>
          <div className="bg-muted h-5 w-1/2 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

const PopularRestaurantsSkeleton = () => {
  return (
    <section className="relative w-full bg-[url('/assets/images/landing/popular-resturent-bg.webp')] bg-cover bg-center">
      <div className="flex w-full justify-center bg-black/60 py-20">
        <div className="content-container flex h-full w-full flex-col justify-center gap-16">
          <div className="flex w-full justify-center">
            <div className="bg-muted/50 h-12 w-3/5 animate-pulse rounded-md" />
          </div>
          <div className="flex h-full flex-wrap justify-center gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <PopularRestaurantCardSkeleton key={index} />
            ))}
          </div>
          <div className="flex w-full justify-center">
            <div className="bg-muted/50 h-12 w-32 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurantsSkeleton;
