import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/Shared/Navbar";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-16/10 w-full rounded-2xl" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-lg" />
            </div>
            <Skeleton className="h-12 w-1/3 rounded-lg" />
            <div className="grid grid-cols-2 gap-6 pt-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-14 w-full rounded-xl mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
