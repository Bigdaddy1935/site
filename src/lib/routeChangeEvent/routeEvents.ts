const routeEventName = (event: string) => `route-change-${event}`
interface IEventDetail {
    from?: string;
    to?: string;
}
export const dispatchRouteChangeEvent = (event: "start" | "completed", data?: IEventDetail) => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
        new CustomEvent(routeEventName(event), {
            bubbles: false,
            cancelable: true,
            detail: data
        })
    );
}

export const registerRouteChangeLister = (
    event: "start" | "completed",
    fn: (data?: IEventDetail) => unknown
) => {
    if (typeof window !== "undefined") {
        window.addEventListener(routeEventName(event), ((event: CustomEvent<IEventDetail>) => {
            fn(event.detail)
        }) as EventListener)
    }
}