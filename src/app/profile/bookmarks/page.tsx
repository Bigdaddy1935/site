import BookMarksList from "@/components/Routes/Profile/bookmarks/BookMarksList";



export const metadata = {
    title: `${'نشان شده ها'} | پروفایل کاربری`
};
export default function BookmarksPage(){
    return (
            <BookMarksList />
    )
}