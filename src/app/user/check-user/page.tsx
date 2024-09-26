import BackBtn from "@/components/Assets/BackBtn";
import Container from "@/components/Assets/Container";
import Paper from "@/components/Assets/Paper";
import CheckUserForm from "@/components/Routes/User/CheckUserForm";
import { Suspense } from "react";

export const metadata = {
    title: "ورود | ثبت نام",
};

export default function CheckUserPage() {
    return (
        <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <h3 className="text-xl text-primary-700 dark:text-text-dark-3 font-semibold text-center mb-7">ورود یا ثبت نام در آکادمی روح بخش</h3>
            <div className="w-[90%] max-w-lg mx-auto mb-3">
                <BackBtn />
            </div>
            <Paper className="w-[90%] max-w-lg mx-auto  lg:p-10">
                <Suspense>
                    <CheckUserForm />
                </Suspense>
            </Paper>
        </Container>
    )
}