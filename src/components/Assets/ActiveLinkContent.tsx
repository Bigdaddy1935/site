"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
export default function ActiveLinkContent({ href, children }: { href: string; children: React.ReactNode }) {
    const pathName = usePathname();
    return (
        <React.Fragment>
            {href === pathName ? children : null}
        </React.Fragment>
    )
}
