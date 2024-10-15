import CreateAccount from "@/components/Routes/User/CreateAccount";
import { Suspense } from "react";

export const metadata = {
    title: "ورود | ثبت نام",
};
export default function CreateAccountPage() {
    return (
        <Suspense>
            <CreateAccount />
        </Suspense>
    )
}