"use client"
import { ReactNode, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';

interface Props {
    children: ReactNode;
}

export default function ReduxStoreProvider({ children }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {

    }, [])
    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
}
