"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  PackagePlus,
  PackageSearch,
  ShoppingCart,
  Receipt,
  Users,
  User,
  Settings,
  LucideLayoutDashboard,
  Store,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";


interface AppSideBarParams  {
  id_store?: string
}


export function AppSidebar({id_store}: AppSideBarParams) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;
  const isSectionActive = (urls: string[]) => urls.some((u) => pathname.startsWith(u));

  return (
    <Sidebar className="">
      <SidebarContent className="flex border flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest text-foreground/50">
            Gestão
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/dashboard") ? "bg-accent" : ""}>
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <LucideLayoutDashboard className="h-4 w-4" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
                    <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isSectionActive(["/dashboard/estoque"]) ? "bg-accent" : ""}
                >
                  <Link href="/dashboard/estoque" className="flex items-center gap-3">
                    <Store className="h-4 w-4" />
                    <span className="text-sm font-medium">Loja</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/estoque/produtos") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/edit`} className="flex items-center gap-3">
                        <PackageSearch className="h-4 w-4" />
                        <span>Editar Loja</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

             

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/estoque/entradas") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/entry`} className="flex items-center gap-3">
                        <PackagePlus className="h-4 w-4" />
                        <span>Entradas</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Estoque (com submenu) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isSectionActive(["/dashboard/estoque"]) ? "bg-accent" : ""}
                >
                  <Link href="/dashboard/estoque" className="flex items-center gap-3">
                    <Boxes className="h-4 w-4" />
                    <span className="text-sm font-medium">Estoque</span>
                  </Link>
                </SidebarMenuButton>

                

                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/estoque/produtos") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/products`} className="flex items-center gap-3">
                        <PackageSearch className="h-4 w-4" />
                        <span>Produtos</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                        <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/estoque/entradas") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/stockDashboard`} className="flex items-center gap-3">
                        <LayoutDashboard className="h-4 w-4" />
                        <span>DashBoard</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/estoque/entradas") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/entry`} className="flex items-center gap-3">
                        <PackagePlus className="h-4 w-4" />
                        <span>Entradas</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Vendas (com submenu) */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isSectionActive(["/dashboard/vendas"]) ? "bg-accent" : ""}
                >
                  <Link href="/dashboard/vendas" className="flex items-center gap-3">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">Vendas</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/vendas/pedidos") ? "bg-accent" : ""}
                    >
                      <Link href="/dashboard/vendas/pedidos" className="flex items-center gap-3">
                        <Receipt className="h-4 w-4" />
                        <span>Pedidos</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      className={isActive("/dashboard/vendas/clientes") ? "bg-accent" : ""}
                    >
                      <Link href={`/store/${id_store}/customers`} className="flex items-center gap-3">
                        <Users className="h-4 w-4" />
                        <span>Clientes</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Perfil */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isSectionActive(["/dashboard/profile"]) ? "bg-accent" : ""}
                >
                  <Link href="/dashboard/profile" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Configurações */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isSectionActive(["/dashboard/settings"]) ? "bg-accent" : ""}
                >
                  <Link href="/dashboard/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rodapé */}
        <div className="p-4 border-t border-foreground/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/50">TEAM CODE</span>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
