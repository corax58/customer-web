import { Restaurant } from "@/types/restaurant.types";

import ImageViewer from "./ImageViewer";

interface RestaurantPhotosProps {
  restaurant: Restaurant;
}
const RestaurantPhotos = ({ restaurant }: RestaurantPhotosProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rtl:[direction:rtl]">
      {restaurant.files.map((file) => (
        <ImageViewer
          key={file.id}
          src={file.url}
          alt={file.name}
          thumbnailClassName="h-52 w-full object-cover"
          className="rounded-lg"
        />
      ))}
    </div>
  );
};

export default RestaurantPhotos;
