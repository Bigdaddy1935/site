"use client";
import { useEffect, useState } from 'react';
import { registerRouteChangeLister } from './routeEvents';

export default function RouteChangeLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        registerRouteChangeLister("start", () => {
            setIsLoading(true);
        });
        registerRouteChangeLister("completed", () => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div style={{ zIndex: "300", height: isLoading ? '3.3px' : 0 }} className='w-full fixed top-0 z-50 bg-hgray-100 right-0 left-0 dark:bg-mdark-600'>
            {isLoading ? <div className="liner-progress-bare"></div> : <div className='w-full h-[3.3px] bg-hgray-100'></div>
            }
        </div>
    )
}
