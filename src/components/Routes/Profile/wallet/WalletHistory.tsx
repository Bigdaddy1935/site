"use client"
import Skeleton from '@/components/Assets/Skeleton';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useDepositHistoryQuery } from '@/lib/services/wallet';
import WalletItem from '../WalletItem';

export default function WalletHistory() {
  const user = useAppSelector(selectUser)
  const { isLoading, data, isError } = useDepositHistoryQuery(undefined, { skip: !user });

  return (
    <div className='flex flex-col'>
      <p className='text-lg mb-4 text-hgray-600 dark:text-white font-medium'>سابقه کیف پول</p>



      <div className='flex flex-col gap-2'>
        {isLoading || !data ?
          <>
            <Skeleton width="100%" height="48px" className='rounded-lg' />
            <Skeleton width="100%" height="48px" className='rounded-lg' />
            <Skeleton width="100%" height="48px" className='rounded-lg' />
          </>
          :
          <>

            {data?.map((item) => <WalletItem key={item.id} {...item} />)}
          </>
        }
      </div>
    </div>
  )
}
