"use client";
import { useEffect } from 'react';

export default function Scripts() {

    useEffect(() => {
        if (typeof document !== "undefined" && typeof window !== "undefined") {
            const titles = document.querySelectorAll(".site_banner_title");

            for (let i = 0; i < titles.length; i++) {
                titles[i]?.addEventListener("mouseenter", function () {
                    titles[i]?.nextElementSibling?.classList.add("lg:opacity-100")
                    titles[i]?.nextElementSibling?.classList.remove("lg:opacity-0")
                    titles[i]?.nextElementSibling?.nextElementSibling?.classList.add("opacity-100")
                    titles[i]?.nextElementSibling?.nextElementSibling?.classList.add("opacity-0")

                    if (i > 0) {
                        titles[0]?.nextElementSibling?.classList.add("lg:!opacity-0")
                        titles[0]?.nextElementSibling?.classList.remove("lg:opacity-100")
                    }
                });


                titles[i]?.addEventListener("mouseleave", function () {
                    titles[i]?.nextElementSibling?.classList.add("lg:opacity-0")
                    titles[i]?.nextElementSibling?.classList.remove("lg:opacity-100")
                    titles[i]?.nextElementSibling?.nextElementSibling?.classList.add("opacity-0")
                    titles[i]?.nextElementSibling?.nextElementSibling?.classList.remove("opacity-100")

                    if (i > 0) {
                        titles[0]?.nextElementSibling?.classList.remove("lg:!opacity-0")
                        titles[0]?.nextElementSibling?.classList.add("lg:opacity-100")
                    }
                })
            }
        }
    }, [])
    return null;
}
