import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OffersCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden border p-0 shadow-none">
      <CardContent className="p-0">
        <div className="relative">
          <div className="bg-secondary absolute top-0 right-0 left-0 h-1" />
          <div className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-7 w-24 rounded-md" />
            </div>

            <Skeleton className="h-3 w-1/3" />

            <Skeleton className="mt-2 h-9 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersCardSkeleton;
