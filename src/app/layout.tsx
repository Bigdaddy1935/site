import Hidden from "@/components/Assets/Hidden";
import MobileBottomNavigation from "@/components/Layout/MobileBottomNavigation/MobileBottomNavigation";
import { siteFont } from "@/fonts";
import MobilePopupProvider from "@/lib/MobilePopupContext";
import ReduxStoreProvider from "@/lib/ReduxStoreProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode, Suspense } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ScrollToHere from "@/components/Assets/ScrollToHere";
import ScrollToTop from "@/components/Assets/ScrollToTop";

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="fa" dir="rtl" className={`${siteFont.className} dark`}>
      <GoogleAnalytics gaId="G-J56M41BZQT" />
      <body className="min-h-screen pb-[80px] lg:pb-0 bg-hgray-100 dark:bg-mdark-500">
        <NextTopLoader showSpinner={false} />
        <ScrollToTop />
        <ReduxStoreProvider>
          <MobilePopupProvider>
            <Suspense>{children}</Suspense>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl
              bodyClassName={siteFont.className}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />

            <Hidden hidden="lg">
              <MobileBottomNavigation />
            </Hidden>
          </MobilePopupProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
