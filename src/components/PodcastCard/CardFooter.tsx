import ShareBtn from '@/components/Assets/ShareBtn';
import ToggleBookmarkBtn from '@/components/Assets/ToggleBookmarkBtn';
import ToggleWishlistBtn from '@/components/Assets/ToggleWishlistBtn';

type Props = {
  like: boolean;
  bookmark: boolean;
  id: number;
  like_count: number;
  color?: string;
  course_id: number;
};
export default function CartFooter(props: Props) {
  return (
    <div className="flex w-full items-center flex-1 justify-center mt-2 gap-1">
      <ToggleBookmarkBtn {...props} model="lesson" />

      <ShareBtn url={`/lessons/${props.course_id}-${props.id}`} />

      <ToggleWishlistBtn model="lesson" {...props} />
    </div>
  );
}
