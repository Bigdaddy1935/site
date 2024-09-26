"use client";
import Container from "@/components/Assets/Container";
import Hidden from "@/components/Assets/Hidden";
import IconLoading from "@/components/Icons/IconLoading";
import Header from "@/components/Layout/Header";
import ProfileSidebar from "@/components/Routes/Profile/ProfileSidebar";
import useAuth from "@/hooks/useAuth";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";
import { selectToken } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useAuthQuery } from "@/lib/services/auth";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();
  const token = useAppSelector(selectToken);
  useAuthQuery({});
  useThemeSwitch();
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col justify-start">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <IconLoading className="text-primary-100" width={36} height={36} />
          </div>
        ) : (
          <div className="flex lg:flex-row flex-col">
            <Hidden hidden="max-lg">
              <ProfileSidebar />
            </Hidden>
            <Container className="flex justify-between lg:w-[95%]">
              <div className="flex max-w-full  flex-1  flex-col gap-6 max-lg:my-4 lg:my-14">
                {children}
              </div>
            </Container>
          </div>
        )}
      </main>
    </>
  );
}
