'use client';
import ClientOnly from '@/components/Assets/ClientOnly';
import IconBagHandleOutline from '@/components/Icons/IconBagHandleOutline';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { selectCart } from '@/lib/reduxFeatures/cartSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import React from 'react';
import NavigationButton from './NavigationButton';

export default function CartButton() {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  return user ?  (
    <React.Fragment>
      <div className="relative flex flex-1 justify-center">
        <NavigationButton label="سبد خرید" href="/cart" Icon={IconBagHandleOutline} />
        <ClientOnly>
          {cart.length > 0 ? (
            <span className="absolute right-0 top-0 flex h-3 w-3 justify-center rounded-full bg-primary-300 text-xs text-white">
              {cart.length}
            </span>
          ) : null}
        </ClientOnly>
      </div>
    </React.Fragment>
  ) : null;
}
