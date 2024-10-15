"use client"
import EmptyButton from '@/components/Assets/EmptyButton';
import IconLoading from '@/components/Icons/IconLoading';
import IconTrashOutline from '@/components/Icons/IconTrashOutline';
import useRemoveFromCart from '@/hooks/cart/useRemoveFromCart';

export default function RemoveCartItemBtn({ item_id }: { item_id: number }) {
    const { removeFromCart, isLoading } = useRemoveFromCart();

    const handleRemove = () => {
        removeFromCart(item_id)
    }
    return (
        <EmptyButton onClick={handleRemove} disabled={isLoading}>
            {isLoading ? <IconLoading width={32} height={32} className='text-hgray-300' /> :

                <IconTrashOutline width={32} height={32} className='text-hgray-300' />
            }
        </EmptyButton>
    )
}
