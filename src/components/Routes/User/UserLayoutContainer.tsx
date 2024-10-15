import UserHeader from "@/components/Layout/UserHeader";
import React, { PropsWithChildren } from "react";

export default function UserLayoutContainer({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      <UserHeader />
      <main className="flex min-h-screen flex-col justify-start">
        {children}
      </main>
    </React.Fragment>
  );
}
