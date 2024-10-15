"use client"
import Button from '@/components/Assets/Button'
import Paper from '@/components/Assets/Paper'
import Divider from '@/components/Divider'
import IconChevronLeft from '@/components/Icons/IconChevronLeft'
import IconLoading from '@/components/Icons/IconLoading'
import usePayWithWallet from '@/hooks/cart/usePayWithWallet'
import usePayWithZarinpal from '@/hooks/cart/usePayWithZarinpal'
import { toLocalString } from '@/lib/number'
import { selectUser } from '@/lib/reduxFeatures/authSlice'
import { selectCart, selectCartTotal, selectDiscount, selectFinalPrice } from '@/lib/reduxFeatures/cartSlice'
import { useAppSelector } from '@/lib/reduxHooks'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { PaymentMethodType } from '@/types/'
import CouponInput from './CouponInput'
import PaymentMethod from './PaymentMethod'

export default function CartPayment() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('zarinpal');
    const total = useAppSelector(selectCartTotal);
    const user = useAppSelector(selectUser);
    const cart = useAppSelector(selectCart)
    const discount = useAppSelector(selectDiscount);
    const finalPrice = useAppSelector(selectFinalPrice);
    const { payWithWallet, isLoading } = usePayWithWallet();
    const { payWithZarinpal, isLoading: isLoading2 } = usePayWithZarinpal();
    const handlePayment = () => {
        paymentMethod === 'wallet' ? payWithWallet() : payWithZarinpal();
    }

    return cart.length > 0 ?  (
        <Paper className='bg-hgray-200 shadow-sm flex gap-4 flex-col'>
            <p className='text-primary-700 dark:text-hgray-200 font-semibold'>اطلاعات پرداخت</p>

            <Divider />

            <CouponInput />

            <Divider />

            <div className='flex items-center justify-between'>
                <p className='font-medium text-hgray-500 dark:text-text-dark-1 text-sm'>جمع کل</p>
                {total ?
                    <p className='text-hgray-600 dark:text-text-dark-1 font-bold'>
                        {toLocalString(total)}<span className='text-hgray-400 dark:text-hgray-200 text-xs font-semibold mr-1'>تومان</span>
                    </p> :
                    <Skeleton width="100px" height="18px" />
                }
            </div>
            <div className='flex items-center justify-between'>
                <p className='font-medium text-hgray-500 dark:text-text-dark-1 text-sm'>موجودی کیف پول</p>

                {user ?
                    <p className='text-primary-700 dark:text-text-dark-1 font-bold'>
                        {toLocalString(Number(user.wallet_balance))}<span className='text-hgray-400 dark:text-hgray-200 text-xs font-semibold mr-1'>تومان</span>
                    </p>

                    : <Skeleton width="100px" height="18px" />
                }
            </div>
            <div className='flex items-center justify-between'>
                <p className='font-medium text-hgray-500 dark:text-text-dark-1 text-sm'>تخفیف</p>
                <p className='text-primary-700 dark:text-text-dark-1 font-bold'>{toLocalString(discount)}<span className='text-hgray-400 dark:text-hgray-200 text-xs font-semibold mr-1'>تومان</span></p>
            </div>

            <Divider />
            <div className='flex items-center justify-between'>
                <p className='font-medium text-hgray-500 dark:text-text-dark-1 text-sm'>مبلغ قابل پرداخت</p>
                {total ?
                    <p className='text-primary-400 dark:text-text-dark-2 text-lg font-bold'>{toLocalString(finalPrice)}<span className='text-hgray-400 dark:text-hgray-200 text-xs font-semibold mr-1'>تومان</span></p>
                    :
                    <Skeleton width="100px" height="18px" />
                }
            </div>

            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />


            <Button disabled={isLoading || isLoading2} onClick={handlePayment} className='flex items-center justify-between'>
                {isLoading || isLoading2 ? <IconLoading width={22} height={22} className='mx-auto inline-block' /> :
                    <>
                        <span>تکمیل فرایند خرید</span>

                        <IconChevronLeft width={32} height={32} />
                    </>
                }
            </Button>

        </Paper>
    ) : null;
}
