import Container from "@/components/Assets/Container";
import Paper from "@/components/Assets/Paper";
import ResetPasswordForm from "@/components/Routes/User/ResetPasswordForm";
import { Suspense } from "react";

export default function PasswordLoginPage() {
    return (
        <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <h3 className="text-xl text-primary-700 font-semibold text-center mb-7">لطفا رمزی برای حساب کاربری خود تعیین کنید</h3>
            <Paper className="w-[90%] max-w-lg mx-auto  lg:p-10">
                <Suspense>
                    <ResetPasswordForm />
                </Suspense>
            </Paper>
        </Container>
    )
}