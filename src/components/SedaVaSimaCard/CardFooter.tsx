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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ToggleBookmarkBtn {...props} model="lesson" />

        <ShareBtn size="cart" url={`/lessons/${props.course_id}-${props.id}`} />
      </div>

      <ToggleWishlistBtn model="lesson" {...props} />
    </div>
  );
}
