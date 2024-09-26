import ClassList from "@/components/Routes/Profile/myClass/ClassList";
import MyClassProvider from "@/components/Routes/Profile/myClass/MyClassProvider";
import MyClassTabs from "@/components/Routes/Profile/myClass/MyClassTabs";

export const metadata = {
    title: `${'کلاس های من'} | پروفایل کاربری`
};
export default function MyClassPage() {
    return (
        <div className="flex gap-[10%] justify-between">
            <div className='w-full'>
                <MyClassProvider>
                    <MyClassTabs />

                    <ClassList />

                </MyClassProvider>
            </div>
        </div>
    )
}