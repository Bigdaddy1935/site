import Skeleton from '@/components/Assets/Skeleton';

export default function PodcastCartSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-xl bg-white shadow-md dark:bg-mdark-600">
      <div>
        <div className="relative h-[80px] w-[110px]">
          <Skeleton height={'100%'} />
        </div>
        <div className="flex my-2 items-center justify-between">
          <Skeleton width="24px" height="24px" />
          <Skeleton width="24px" height="24px" />
          <Skeleton width="24px" height="24px" />
        </div>
      </div>

      <div className="relative -mt-3 flex flex-1 flex-col  rounded-xl bg-white  p-3   dark:bg-mdark-600">
        <div className="flex items-center justify-between">
          <Skeleton width="70px" height="18px" />

          <Skeleton className="mt-4" width="100px" height="14px" />
        </div>

        <div className="flex  flex-1 flex-col justify-end">
            <Skeleton width="130px" height="18px" />
        </div>
      </div>
    </div>
  );
}
