import ShareBtn from '@/components/Assets/ShareBtn';
import ToggleBookmarkBtn from '@/components/Assets/ToggleBookmarkBtn';
import ToggleWishlistBtn from '@/components/Assets/ToggleWishlistBtn';

type Props = {
  like: boolean;
  bookmark: boolean;
  id: number;
  like_count: number;
  color: string;
}
export default function CardFooter(props: Props) {

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <ToggleBookmarkBtn {...props} model='article' />

        <ShareBtn url={`/article/content-${props?.id}`}  />
      </div>


      <ToggleWishlistBtn {...props} model='article' />
    </div>
  )
}
