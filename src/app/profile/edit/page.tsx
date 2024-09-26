import EditProfileForm from "@/components/Routes/Profile/edit/EditProfileForm";

export const metadata = {
    title: `${'ویرایش'} | پروفایل کاربری`
};
export default function EditProfile() {
    return (
        <div className="flex flex-col items-stretch gap-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-hgray-600 dark:text-hgray-200">ویرایش پروفایل</h2>

           <EditProfileForm />
        </div>
    )
}