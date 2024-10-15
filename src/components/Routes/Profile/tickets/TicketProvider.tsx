'use client';
import React, { createContext, useContext, useState } from 'react';

export type TicketContextType = {
  setShowDetails: (a: any) => void;
  showDetails: null | number;
  isAdmin?: boolean;
};
const TicketContext = createContext<TicketContextType>({
  showDetails: null,
  setShowDetails: (a: any) => {}
});

export const useTicketList = () => useContext(TicketContext);

export default function TicketProvider({
  children,
  isAdmin = false
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const [showDetails, setShowDetails] = useState<number | null>(null);
  return (
    <TicketContext.Provider value={{ showDetails, setShowDetails, isAdmin }}>
      {children}
    </TicketContext.Provider>
  );
}
