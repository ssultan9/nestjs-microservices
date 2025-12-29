import React from "react";
import type { ReactNode } from "react";

export const metadata = {
  title: "Dynamic Signup",
  description: "Dynamic signup form from JSON",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Roboto, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
