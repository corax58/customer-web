import { Suspense } from "react";

import CategoryList from "./_components/CategoryList";
import CategoryListSkeleton from "./_components/CategoryListSkeleton";

const CategoryPage = () => {
  return (
    <div className="content-container min-h-dvh space-y-10 pt-36 pb-20">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
