import Image from "@/components/Assets/Image"

export default function EmptyGrid() {
    return (
        <div className='text-center flex flex-col items-center justify-center text-2xl min-h-[260px] font-medium text-primary-700 rounded-lg w-full !min-w-[100%] flex-1'>
            <Image 
             src={'/search_not_found.png'} 
             width={185} 
             height={100} 
             className='object-contain rounded-lg mx-auto' alt='' />

            <p className='text-hgray-300 mt-4 text-base'>موردی جهت نمایش وجود ندارد</p>
        </div>
    )
}
