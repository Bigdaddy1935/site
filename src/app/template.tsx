import RouteChangeTemplate from '@/lib/routeChangeEvent/RouteChangeTemplate'
import React from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
                {children}
        </React.Fragment>
    )
}
