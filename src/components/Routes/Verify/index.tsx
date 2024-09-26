"use client"
import Button from "@/components/Assets/Button";
import ContainerLayout from "@/components/Assets/ContainerLayout";
import IconLoading from "@/components/Icons/IconLoading";
import Animation from "@/components/Routes/Success/Animation";
import { useVerifyZarinpalQuery } from "@/lib/services/cart";
import { useSearchParams } from "next/navigation";

export default function Verify() {
    const params = useSearchParams();
    const Authority = params.get("Authority");
    const { isLoading, data, error } = useVerifyZarinpalQuery({
        Authority: Authority ?? '',
    }, {
        skip: !Authority
    });



    return (
        <ContainerLayout>
            <div className="min-h-screen flex flex-col items-center justify-start mt-[10vh]">

                {isLoading ? <IconLoading /> : (
                    error ? <>
                        <>

                            <Animation success={false}/>

                            <h3 className="text-4xl my-5 text-rose-500 font-semibold">فرایند پرداخت با خطا مواجه شد</h3>


                            <Button className="bg-rose-500" href="/profile">رفتن به حساب کاربری</Button>
                        </>
                    </> :
                        <>

                            <Animation success={true}/>

                            <h3 className="text-4xl my-5 text-primary-300 font-semibold">پرداخت با موفقیت انجام شد</h3>

                            <p className="font-bold text-primary-700 text-xl mb-3">کد پیگیری : {data?.ref_id}</p>

                            <Button href="/profile">رفتن به حساب کاربری</Button>
                        </>
                )
                }
            </div>
        </ContainerLayout>
    )
}