
import BackBtn from "@/components/Assets/BackBtn";
import Container from "@/components/Assets/Container";
import Paper from "@/components/Assets/Paper";
import SignupForm from "@/components/Routes/User/SignupForm";
import { Suspense } from "react";
export const metadata = {
    title: "ثبت نام",
};
export default function SignupPage() {

    return (
        <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-10">
            <div className="w-[90%] max-w-lg mx-auto mb-3">
                <BackBtn />
            </div>
            <Suspense>
                <Paper className="w-[97%] max-w-lg mx-auto  lg:p-10">
                    <SignupForm />
                </Paper>

            </Suspense>
        </Container>
    )
}