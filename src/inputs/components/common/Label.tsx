"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TProps = {
  className?: string;
  children?: ReactNode;
};
export function Label({ className, children }: TProps) {
  return (
    <>
      {children && (
        <label className={twMerge("dark:text-white", className)}>
          {children}
        </label>
      )}
    </>
  );
}
