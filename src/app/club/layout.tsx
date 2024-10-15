import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import React from 'react';

export default function MahdyarLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <main className="flex min-h-screen flex-col justify-start">
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
