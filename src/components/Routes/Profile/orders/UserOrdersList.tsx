"use client"
import Skeleton from '@/components/Assets/Skeleton';
import { useGetUserOrdersQuery } from '@/lib/services/auth';
import OrderDetails from './OrderDetails';
import OrderItem from './OrderItem';
import { useOrderList } from './OrderListProvider';

export default function UserOrdersList() {
    const { data, isLoading } = useGetUserOrdersQuery();
    const { showDetails } = useOrderList();
    const selectedOrder = showDetails ? data?.find(i => i.id === showDetails) : null
    return (
        <div>
            {showDetails && selectedOrder ? <OrderDetails {...selectedOrder} /> : <>

                {isLoading ? <Skeleton width={"100%"} height={"45px"} count={4} /> :
                    data?.slice().sort((a,b)=> a.order_id - b.order_id).map(item => <OrderItem {...item} key={item.id} />)}
            </>}
        </div>
    )
}

