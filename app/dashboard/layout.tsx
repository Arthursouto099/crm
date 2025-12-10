import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

interface DashboardRootLayoutProps {
  children: ReactNode;
}

export default function DashboardRootLayout({
  children,
}: DashboardRootLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col min-w-0">
     
            <SidebarTrigger className="md:hidden" />
         


          <main className="flex-1 px-4 py-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
