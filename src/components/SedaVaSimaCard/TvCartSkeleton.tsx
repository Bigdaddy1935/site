import Skeleton from "@/components/Assets/Skeleton";


export default function TvCartSkeleton() {
    return (
        <div className="rounded-xl shadow-md overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden h-[20rem]">
                <Skeleton height={"100%"} />
            </div>


            <div className="relative bg-white dark:bg-mdark-600 flex flex-col p-5">
                <div className='flex-1 mt-5'>

                <Skeleton width="180px" height="18px"  />
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
