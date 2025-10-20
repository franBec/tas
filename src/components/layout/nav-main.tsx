"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTextTruncated } from "@/hooks/use-text-truncated";

function NavMainSubItem({
  subItem,
  currentPathname,
}: {
  subItem: {
    title?: string;
    url: string;
  };
  currentPathname?: string;
}) {
  const { ref, isTruncated } = useTextTruncated(subItem.title || "");
  const isActive = currentPathname === subItem.url;

  return (
    <SidebarMenuSubItem>
      {subItem.title && isTruncated ? (
        <Tooltip>
          <TooltipTrigger className="w-full text-left">
            <SidebarMenuSubButton asChild isActive={isActive}>
              <Link href={subItem.url}>
                <span ref={ref}>{subItem.title}</span>
              </Link>
            </SidebarMenuSubButton>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            {subItem.title}
          </TooltipContent>
        </Tooltip>
      ) : (
        subItem.title && (
          <SidebarMenuSubButton asChild isActive={isActive}>
            <Link href={subItem.url}>
              <span ref={ref}>{subItem.title}</span>
            </Link>
          </SidebarMenuSubButton>
        )
      )}
    </SidebarMenuSubItem>
  );
}

function NavMainItem({
  item,
  currentPathname,
}: {
  item: {
    title?: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
    items?: {
      title?: string;
      url: string;
    }[];
  };
  currentPathname?: string;
}) {
  const { ref, isTruncated } = useTextTruncated(item.title || "");
  const isActive = currentPathname === item.url;

  return (
    <Collapsible asChild defaultOpen={item.isActive}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={item.url}>
            {item.icon && <item.icon className="size-4" />}
            {item.title && isTruncated ? (
              <Tooltip>
                <TooltipTrigger className="w-full text-left">
                  <span ref={ref}>{item.title}</span>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              item.title && <span ref={ref}>{item.title}</span>
            )}
          </Link>
        </SidebarMenuButton>
        {item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <NavMainSubItem
                    key={subItem.title || "nav-item"}
                    subItem={subItem}
                    currentPathname={currentPathname}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({
  items,
  groupLabel,
  currentPathname,
}: {
  items: {
    title?: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
    items?: {
      title?: string;
      url: string;
    }[];
  }[];
  groupLabel?: string;
  currentPathname?: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavMainItem
            key={item.title}
            item={item}
            currentPathname={currentPathname}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
