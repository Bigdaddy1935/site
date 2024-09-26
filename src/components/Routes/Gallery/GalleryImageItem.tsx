import Image from '@/components/Assets/Image';
import { Library } from '@/types/';

type Props = {
  onClick: () => void;
} & Library;
export default function GalleryImageItem({ onClick, picture, title, id }: Props) {
  return (
    <div className="w-[46%] cursor-pointer lg:w-[unset]" onClick={onClick}>
      <div>
        <Image
          loading="eager"
          width={360}
          height={250}
          className="rounded-2xl"
          alt=""
          src={picture}
        />
      </div>

      <p className="text-base font-normal text-hgray-400">{title}</p>
    </div>
  );
}
