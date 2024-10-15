import ProfileLayoutClient from "@/components/Routes/Profile/ProfileLayoutClient";

import React from "react";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ProfileLayoutClient>
      {children}
    </ProfileLayoutClient>
  );
}
