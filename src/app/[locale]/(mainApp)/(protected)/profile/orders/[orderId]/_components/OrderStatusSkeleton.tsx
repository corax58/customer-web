import { cn } from "@/lib/utils"; // Assuming you use a utility for classnames

const OrderStatusSkeleton = () => {
  return (
    <div
      className="relative flex w-full flex-col justify-between"
      style={{ height: "22rem" }}
    >
      {/* The static vertical line in the background */}
      <div className="absolute top-0 h-full w-1 -translate-x-1/2 animate-pulse bg-slate-200 ltr:start-1/2 rtl:end-1/2 dark:bg-slate-700" />

      {/* Create 5 skeleton items to represent the loading state */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "z-10 flex animate-pulse items-center justify-center",
            index === 0 && "items-start", // First item
            index === 4 && "items-end", // Last item
          )}
        >
          {/* Left Side: Text placeholder or Spacer */}
          {index % 2 === 0 ? (
            <div className={cn("-ms-px w-1/2 pe-6 text-end")}>
              <div className="flex flex-col items-end gap-y-2">
                <div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ) : (
            <div className="w-1/2" />
          )}

          {/* Center Circle */}
          <div className="h-6 w-6 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />

          {/* Right Side: Text placeholder or Spacer */}
          {index % 2 !== 0 ? (
            <div className="-me-px w-1/2 ps-5 text-start">
              <div className="flex flex-col items-start gap-y-2">
                <div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ) : (
            <div className="w-1/2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusSkeleton;
