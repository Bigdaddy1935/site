import UserHeader from '@/components/Layout/UserHeader';
import React from 'react';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <UserHeader />
      <main className="flex min-h-screen flex-col justify-start">{children}</main>
    </React.Fragment>
  );
}
