import Skeleton from "@/components/Assets/Skeleton";


export default function ClassCartSkeleton() {
    return (
        <div className="rounded-xl shadow-md overflow-hidden">
            <div className="relative h-[13rem]">
                <Skeleton height={"100%"} />
            </div>


            <div className="relative h-[180px] bg-white dark:bg-mdark-600 flex flex-col  rounded-xl -mt-3   p-5">

                <Skeleton width="100px" height="18px" />


                <Skeleton className='mt-4' width="60%" height="14px" />


                <div className="flex-1 flex flex-col justify-end">
            

                    <div className="block text-sm ">
                        <Skeleton width="110px" height="14px" />
                    </div>
                    
                    <div className="">
                        <Skeleton width="130px" height="14px" />
                    </div>
                </div>

                <div className="absolute left-2 bottom-2">
                <Skeleton circle width={"120px"} height={"120px"} />
            </div>
            </div>
        </div>
    )
}
