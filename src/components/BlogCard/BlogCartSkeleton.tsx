import Skeleton from "@/components/Assets/Skeleton";


export default function BlogCartSkeleton() {
    return (
        <div className="rounded-xl shadow-md overflow-hidden">
            <div className="relative h-[13rem]">
                <Skeleton height={"100%"} />
            </div>


            <div className="relative bg-white dark:bg-mdark-600 flex flex-col  rounded-xl -mt-3   p-5">

                <Skeleton width="130px" height="14px" />


                <div className="min-h-[105px] mt-2">
                    <Skeleton width={"100%"} height="14px" />
                    <Skeleton width={"60%"} height="14px" />

                    <div className="block text-sm ">
                        <Skeleton width="130px" height="14px" />
                    </div>

                    <div className="flex w-full justify-end items-center  text-sm  ">
                        <Skeleton width="130px" height="14px" />
                    </div>
                </div>
                <div />

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
