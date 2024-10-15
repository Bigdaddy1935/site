import Image from "@/components/Assets/Image"

export default function EmptyGrid() {
    return (
        <div className='text-center text-2xl min-h-[260px] font-medium text-primary-700 rounded-lg  col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3'>
            <Image 
             src={'/empty-search.jpg'} 
             width={185} 
             height={100} 
             className='object-contain rounded-lg mx-auto' alt='' />

            <p className='text-hgray-300 mt-4 text-base'>موردی جهت نمایش وجود ندارد</p>
        </div>
    )
}
