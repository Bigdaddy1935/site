"use client";

import BackBtn from "@/components/Assets/BackBtn";
import Container from "@/components/Assets/Container";
import Paper from "@/components/Assets/Paper";
import VerificationForm from "@/components/Routes/User/VerificationForm";
import { Suspense } from "react";

export default function VerificationPage() {
    return (
        <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="w-[90%] max-w-lg mx-auto mb-3">
                <BackBtn />
            </div>
            <Paper className="w-[90%] max-w-lg mx-auto  lg:p-10">
                <Suspense>
                    <VerificationForm />
                </Suspense>
            </Paper>
        </Container>

    )
}