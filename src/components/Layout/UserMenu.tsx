"use client";
import ClientOnly from "@/components/Assets/ClientOnly";
import Skeleton from "@/components/Assets/Skeleton";
import { selectToken, selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useAuthQuery } from "@/lib/services/auth";
import { useLazyGetCartQuery } from "@/lib/services/cart";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AuthUserMenu from "./AuthUserMenu";
import LoginButton from "./LoginButton";
import { skip } from "node:test";

export default function UserMenu() {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const { isLoading } = useAuthQuery({}, { skip: !token });
  const [trigger] = useLazyGetCartQuery(undefined);
  const pathName = usePathname();
  useEffect(() => {
    if (user) trigger();
  }, [user]);
  return (
    <React.Fragment>
      <ClientOnly>
        {pathName.includes("/profile") ? null : (
          <>
            {isLoading ? (
              <Skeleton width="42px" height="42px" circle className="mx-2" />
            ) : (
              <>
                {user ? (
                  <>
                    <AuthUserMenu />
                  </>
                ) : (
                  <LoginButton />
                )}
              </>
            )}
          </>
        )}
      </ClientOnly>
    </React.Fragment>
  );
}
