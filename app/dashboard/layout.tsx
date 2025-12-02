import { AppSidebar } from "@/components/app-siderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"




interface DashboardRootLayout  {
    children: React.ReactNode
}



export default function DashboardRootLayout({children}: DashboardRootLayout) {
    return (
       <SidebarProvider>
        <AppSidebar/>
            <main className="w-full">
                {children}
            </main>
       </SidebarProvider>
    )
}