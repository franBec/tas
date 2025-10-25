import * as React from "react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  currentPathname,
  ...props
}: {
  items: {
    title?: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  currentPathname?: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  size="sm"
                  isActive={currentPathname === item.url}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="size-4" />}
                    {item.title && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
