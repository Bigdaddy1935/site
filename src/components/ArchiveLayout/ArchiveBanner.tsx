import Image from "../Assets/Image";

export default function ArchiveBanner() {
    return (
        <div className='rounded-lg overflow-hidden h-[127px] lg:h-[200px] relative'>
            <Image src={'/banner.jpg'} fill sizes='' alt='' className="object-cover"/>
        </div>
    )
}
