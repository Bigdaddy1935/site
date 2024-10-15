import Skeleton from "@/components/Assets/Skeleton";

export default function ProductCartSkeleton() {
    return (
        <div className="rounded-xl shadow-md overflow-hidden">
            <div className="relative h-[13rem]">
                <Skeleton height={"100%"} />
            </div>


            <div className="relative bg-white dark:bg-mdark-600 flex flex-col  rounded-xl -mt-3   p-5">

                <Skeleton width="100px" height="18px" />


                <Skeleton className='mt-4' width="80%" height="14px" />


                <div className="min-h-[60px] flex flex-col justify-end">
            

                    <div className="block text-sm text-hgray-600 dark:text-hgray-300 ">
                        <Skeleton width="130px" height="14px" />
                    </div>
                    
                    <div className="">
                        <Skeleton width="130px" height="14px" />
                    </div>
                </div>

                <div className="h-0.5 my-3 bg-primary-700" />

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <Skeleton containerClassName='flex-1' width="24px" height="24px" />
                        <Skeleton containerClassName='flex-1' width="24px" height="24px" />
                    </div>


                    <Skeleton width="24px" height="24px" />
                </div>
            </div>
        </div>
    )
}
