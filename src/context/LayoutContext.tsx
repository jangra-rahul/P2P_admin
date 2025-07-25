"use client";

import { createContext, useContext, useState, ReactNode, JSX } from "react";

type LayoutContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};