import IconMathPlus from '@/components/Icons/IconMathPlus';
import { toLocalString } from '@/lib/number';
import { toPersianDateFormat } from '@/lib/toPersianDateFormat';
import { Deposit } from '@/types/';

export default function WalletItem(props: Deposit) {
    const { amount, created_at, type } = props;
    return (
        <div className='flex items-center justify-between rounded-lg border border-solid border-hgray-300 p-2 px-4 relative max-lg:mb-4'>
            <p className='flex font-light items-center text-hgray-600'>
                <IconMathPlus width={26} height={26} className='ml-2' />

                <span>{type}</span>
            </p>


            <p className='text-hgray-600 dark:text-white font-light'>مبلغ {toLocalString(amount)} تومان</p>

            <p className='text-hgray-600 dark:text-white font-light max-lg:absolute left-0 bottom-[-20px] max-lg:text-sm'>تاریخ {toPersianDateFormat(created_at)}</p>
        </div>
    )
}
