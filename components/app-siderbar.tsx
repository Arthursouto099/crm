"use client";
import { Calendar, Home, Inbox, LucideLayoutDashboard, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuthContext from "@/hooks/use-auth";
import { ModeToggle } from "./toggle-theme";

const items = [
  { title: "Projetos",     url: "/dashboard/projects", icon: LucideLayoutDashboard },
  { title: "Perfil",    url: "/dashboard/profile", icon: User },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search",   url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { user } = useAuthContext();
  

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          

          <SidebarGroupContent>
            {/* Bloco do usuário */}
            <div className="flex items-center gap-3 px-2 py-3 mb-3 rounded-md bg-muted/40">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profile_image ?? "https://github.com/shadcn.png"} />
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-[12px] leading-tight">
                <h1 className="font-medium truncate">
                  {user?.name ?? "Usuário"}
                </h1>
                <h2 className="text-muted-foreground truncate">
                  {user?.email}
                </h2>
              </div>
            </div>

            {/* Menu */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rodapé (toggle de tema) */}
        <div className="p-3 pb-5">
          <ModeToggle />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
