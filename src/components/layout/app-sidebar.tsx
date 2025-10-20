"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes, SidebarContentType } from "@/lib/routes";
import packageJson from "../../../package.json";

interface NavMainItem {
  title?: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: { title: string; url: string }[];
}

const getNavMainItems = (): {
  groupLabel?: string;
  items: NavMainItem[];
} | null => {
  const navMainRoot = Object.values(routes).find(
    (route) => route.sidebarContent === SidebarContentType.NAV_MAIN_ROOT
  );

  if (!navMainRoot) {
    return null;
  }

  const groupItems: NavMainItem[] = [];

  if (navMainRoot.children) {
    Object.values(navMainRoot.children).forEach((child) => {
      if (child.sidebarContent === SidebarContentType.NAV_MAIN_ITEM) {
        groupItems.push({
          title: child.title,
          url: child.uri,
          icon: child.icon,
          items: child.children
            ? Object.values(child.children)
                .filter(
                  (grandchild) =>
                    grandchild.sidebarContent ===
                    SidebarContentType.NAV_MAIN_ITEM
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

  return {
    groupLabel: navMainRoot.title,
    items: groupItems,
  };
};

const getNavSecondaryItems = (): NavMainItem[] => {
  const navSecondaryItems: NavMainItem[] = [];

  Object.values(routes).forEach((route) => {
    if (route.sidebarContent === SidebarContentType.NAV_SECONDARY_ITEM) {
      navSecondaryItems.push({
        title: route.title,
        url: route.uri,
        icon: route.icon,
      });
    }
  });

  return navSecondaryItems;
};

const navMainGroup = getNavMainItems();
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
        {navMainGroup && (
          <NavMain
            items={navMainGroup.items}
            groupLabel={navMainGroup.groupLabel}
            currentPathname={pathname}
          />
        )}
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
