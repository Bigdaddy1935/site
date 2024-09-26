import CommentsProvider from "@/components/Comments/CommentProvider";
import AdminCommentsList from "@/components/Routes/AdminCommentsList";

export const metadata = {
  title: `${'مدیریت نظرات'} | پروفایل کاربری`
};
export default function ManageCommentsPage() {
  return (
    <div className="flex flex-col  items-stretch gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-hgray-600 dark:text-white">مدیریت نظرات کاربران</h2>
      </div>

      <CommentsProvider>
        <AdminCommentsList />
      </CommentsProvider>
    </div>
  )
}