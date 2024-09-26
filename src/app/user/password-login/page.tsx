import Container from "@/components/Assets/Container";
import Paper from "@/components/Assets/Paper";
import LoginPasswordForm from "@/components/Routes/User/LoginPasswordForm";
import { Suspense } from "react";

export default function PasswordLoginPage() {
    return (
        <Container className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            <Paper className="w-[90%] max-w-lg mx-auto  lg:p-10">
                <Suspense>
                    <LoginPasswordForm />
                </Suspense>
            </Paper>
        </Container>
    )
}