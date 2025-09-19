import { ThemeProvider } from "@/components/theme-provider";

import { type ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default Layout;
