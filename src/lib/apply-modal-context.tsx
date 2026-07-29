"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ApplyModalContextValue = {
  isOpen: boolean;
  openApplyModal: () => void;
  closeApplyModal: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ApplyModalContext.Provider
      value={{
        isOpen,
        openApplyModal: () => setIsOpen(true),
        closeApplyModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) {
    throw new Error("useApplyModal must be used within an ApplyModalProvider");
  }
  return ctx;
}
