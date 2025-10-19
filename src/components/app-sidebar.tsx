"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes, type RouteNode } from "@/lib/routes";
import packageJson from "../../package.json";

interface NavMainItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: { title: string; url: string }[];
}

const getNavMainItems = (): { groupLabel: string; items: NavMainItem[] }[] => {
  const navMainGroups: { groupLabel: string; items: NavMainItem[] }[] = [];

  const traverseRoutes = (routeMap: Record<string, RouteNode>) => {
    Object.values(routeMap).forEach((route) => {
      if (route.sidebarContent === "NAV_MAIN_GROUP_LABEL") {
        const groupItems: NavMainItem[] = [];

        if (route.children) {
          Object.values(route.children).forEach((child) => {
            if (child.sidebarContent === "NAV_MAIN_ITEM") {
              groupItems.push({
                title: child.title || "",
                url: child.uri,
                icon: child.icon,
                items: child.children
                  ? Object.values(child.children)
                      .filter(
                        (grandchild) =>
                          grandchild.sidebarContent === "NAV_MAIN_ITEM"
                      )
                      .map((grandchild) => ({
                        title: grandchild.title || "",
                        url: grandchild.uri,
                      }))
                  : [],
              });
            }
          });
        }

        if (groupItems.length > 0) {
          navMainGroups.push({
            groupLabel: route.title || "",
            items: groupItems,
          });
        }
      }

      if (route.children) {
        traverseRoutes(route.children);
      }
    });
  };

  traverseRoutes(routes);
  return navMainGroups;
};

const getNavSecondaryItems = (): NavMainItem[] => {
  const navSecondaryItems: NavMainItem[] = [];

  const traverseRoutes = (routeMap: Record<string, RouteNode>) => {
    Object.values(routeMap).forEach((route) => {
      if (route.sidebarContent === "NAV_SECONDARY_ITEM") {
        navSecondaryItems.push({
          title: route.title || "",
          url: route.uri,
          icon: route.icon,
        });
      }
      if (route.children) {
        traverseRoutes(route.children);
      }
    });
  };

  traverseRoutes(routes);
  return navSecondaryItems;
};

const navMainGroups = getNavMainItems();
const navSecondary = getNavSecondaryItems();

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src="/government-fill.svg"
                    alt="Government"
                    className="size-4 invert"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Municipal Services
                  </span>
                  <span className="truncate text-xs">San Luis</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navMainGroups.map((nav, index) => (
          <NavMain
            key={index}
            items={nav.items}
            groupLabel={nav.groupLabel}
            currentPathname={pathname}
          />
        ))}
        <NavSecondary
          items={navSecondary}
          className="mt-auto"
          currentPathname={pathname}
        />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-sidebar-foreground">
          Version {packageJson.version}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
