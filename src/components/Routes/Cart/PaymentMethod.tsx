"use client"
import Image from "@/components/Assets/Image";
import { PaymentMethodType } from '@/types/';


type Props = {
    paymentMethod: PaymentMethodType;
    setPaymentMethod: (p: PaymentMethodType) => void
}
export default function PaymentMethod(props: Props) {
    const { paymentMethod, setPaymentMethod } = props;
    return (
        <div className='flex justify-evenly items-stretch'>
            <div onClick={() => setPaymentMethod('wallet')} className={`flex cursor-pointer items-center border border-solid ${paymentMethod === 'wallet' ? 'border-primary-700 dark:border-hgray-400' : 'border-hgray-300 dark:border-primary-700'} rounded-lg p-2`}>
                <Image src={'/wallet.png'} width={50} height={50} alt='' className='object-contain' />
                <div className='mr-1'>
                    <p className='font-light text-hgray-400 dark:text-hgray-200'>اعتباری</p>
                    <p className='font-light text-hgray-400 dark:text-hgray-200'>کیف پول</p>
                </div>
            </div>
            <div onClick={() => setPaymentMethod('zarinpal')} className={`flex cursor-pointer items-center border border-solid ${paymentMethod === 'zarinpal' ? 'border-primary-700 dark:border-hgray-400' : 'border-hgray-300 dark:border-primary-700'} rounded-lg p-2`}>
                <Image src={'/zarinpal.png'} width={42} height={65} alt='' />
                <div className='mr-1'>
                    <p className='font-light text-hgray-400 dark:text-hgray-200'>نقدی</p>
                    <p className='font-light text-hgray-400 dark:text-hgray-200'>زرین پال</p>
                </div>
            </div>
        </div>
    )
}
