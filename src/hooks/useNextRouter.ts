"use client"
import { dispatchRouteChangeEvent } from "@/lib/routeChangeEvent/routeEvents";
import { AppRouterInstance, NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import * as NProgress from 'nprogress';
export default function useNextRouter(): AppRouterInstance {
    const router = useRouter();
    const routerProxyRef = useRef<ReturnType<typeof useRouter> | null>(null);
    useEffect(() => {
        const routerProxy = new Proxy(router, {
            get: (target, prop: "push" | "back") => {
                if (prop === "push" || prop === "back") {
                    return (href: string, options?: NavigateOptions) => {
                      //  dispatchRouteChangeEvent("start");
                        NProgress.start();
                        return target[prop](href, options);
                    }
                }
                return target[prop];
            }
        });

        routerProxyRef.current = routerProxy;

        return () => {
            routerProxyRef.current = null;
        }
    }, [router]);


    return routerProxyRef.current || router;
}