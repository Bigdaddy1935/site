import EmptyButton from '@/components/Assets/EmptyButton'
import Paper from '@/components/Assets/Paper'
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort'
import { toLocalString } from '@/lib/number'
import { toPersianDateTimeFormat } from '@/lib/toPersianDateFormat'
import { Order } from '@/types/'
import { useOrderList } from './OrderListProvider'

export default function OrderItem(props: Order) {
    const { setShowDetails } = useOrderList();

    const items = [
        {
            title: "شماره فاکتور",
            value: props.id,
            width: "min-w-[150px]"
        },
        {
            title: "مبلغ پرداخت شده",
            value: <>{toLocalString(props.amount)} <span className='text-sm font-normal text-hgray-400 dark:text-hgray-300 mr-0.5'>تومان</span></>,
            width: "min-w-[150px]"
        },
        {
            title: "نوع پرداخت",
            value: props.card_pan === 'wallet' ? 'کیف پول' : 'درگاه پرداخت',
            width: "min-w-[150px]"
        },
        {
            title: "شماره پیگیری",
            value: props.ref_id,
            width: "min-w-[200px]"
        },
        {
            title: "تاریخ سفارش",
            value: <span className='ltr inline-block'>{toPersianDateTimeFormat(props.created_at)}</span>,
            width: "min-w-[200px]"
        },
    ]
    return (
        <div className='my-4'>
            <Paper>
                <div className='flex justify-between items-center flex-wrap'>
                    {items.map(i => (
                        <div className={`${i.width} flex items-center justify-between sm:justify-start w-full sm:w-auto mb-2 lg:mb-0`} key={i.title}>
                            <p className='text-sm text-hgray-400 dark:text-hgray-200'>{i.title}:</p>
                            <p className='text-sm font-medium text-hgray-600 mr-1 dark:text-hgray-200'>{i.value}</p>

                        </div>
                    ))}
                    <EmptyButton
                        onClick={() => setShowDetails(props.id)}
                        className='flex items-center text-blue-600 justify-end lg:justify-start w-full sm:w-auto'>
                        <span>
                            جزییات
                        </span>

                        <IconArrowLeftShort width={24} height={24} />
                    </EmptyButton>
                </div>
            </Paper>
        </div>
    )
}
