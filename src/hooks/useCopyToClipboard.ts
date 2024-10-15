"use client"
import { toast } from "react-toastify";


export default function useCopyToClipBoard() {
    const copyToClipboard = async (text: string, success: string = 'متن مورد نظر با موفقیت در حافظه کپی شد.') => {
           // Check for iOS devices
           const isIOS = navigator.userAgent.match(/ipad|iphone|ipod/i);

           if (isIOS) {
               // Fallback method for iOS
               const textarea = document.createElement("textarea");
               textarea.value = text;
               textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in iOS
               document.body.appendChild(textarea);
               textarea.focus();
               textarea.select();
               document.execCommand("copy");
               document.body.removeChild(textarea);
               toast.success(success);
           } else {
               // Modern approach for non-iOS devices
               const permissions = await navigator.permissions.query({ name: "clipboard-write" as PermissionName });
               if (permissions.state === "granted" || permissions.state === "prompt") {
                   await navigator.clipboard.writeText(text);
                   toast.success(success);
               } else {
                   throw new Error("Can't access the clipboard. Check your browser permissions.");
               }
           }
    };

    return { copyToClipboard };
}