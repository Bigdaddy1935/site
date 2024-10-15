"use client"
import { toLocalString } from '@/lib/number'
import { selectUser } from '@/lib/reduxFeatures/authSlice'
import { useAppSelector } from '@/lib/reduxHooks'
import Skeleton from 'react-loading-skeleton'

export default function WalletAmount() {
    const user = useAppSelector(selectUser)
    return (
        <div className='flex p-3 justify-between rounded-lg bg-gradient-to-l from-primary-300 from-30% to-white to-[107%]'>
            <p className='flex-1 text-white'>موجودی کیف پول شما</p>

            {user ? <p className='font-medium text-primary-700'>{toLocalString(user?.wallet_balance)} تومان</p> :
                <Skeleton width="160px" height="18px" className='rounded-lg' />}
        </div>
    )
}
