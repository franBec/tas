import {
  Bell,
  Building,
  Bus,
  FileText,
  Gavel,
  Landmark,
  LogIn,
  Scale,
  User,
  UserPlus,
  Users,
} from "lucide-react";

export enum SidebarContentType {
  NAV_MAIN_ROOT = "NAV_MAIN_ROOT",
  NAV_MAIN_ITEM = "NAV_MAIN_ITEM",
  NAV_SECONDARY_ITEM = "NAV_SECONDARY_ITEM",
}

export interface RouteNode {
  uri: string;
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: Record<string, RouteNode>;
  sidebarContent?: SidebarContentType;
}

export const routes: Record<string, RouteNode> = {
  "/": {
    uri: "/",
    title: "Municipal Services",
    subtitle: "Your Digital Gateway to Local Government Services",
  },
  "/about-author": {
    uri: "/about-author",
    title: "About the Author",
    subtitle: "Meet the developer behind this project",
    icon: User,
    sidebarContent: SidebarContentType.NAV_SECONDARY_ITEM,
  },
  "/about-project": {
    uri: "/about-project",
    title: "About this Project",
    subtitle: "Building better software for municipal services",
    icon: FileText,
    sidebarContent: SidebarContentType.NAV_SECONDARY_ITEM,
  },
  "/areas": {
    uri: "/areas",
    title: "Areas",
    subtitle: "Explore different areas of the municipal platform",
    icon: Building,
    children: {
      "/areas/admin": {
        uri: "/areas/admin",
        title: "Administration",
        subtitle: "Administrative tools",
        icon: Users,
        sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
      },
      "/areas/gov": {
        uri: "/areas/gov",
        title: "Government Area",
        subtitle:
          "View and manage government-related areas and their information",
        icon: Building,
        children: {
          "/areas/gov/finance": {
            uri: "/areas/gov/finance",
            title: "Finance, Infrastructure & Planning",
            subtitle:
              "Managing municipal finances, infrastructure development, and urban planning initiatives",
            icon: Building,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/public-services": {
            uri: "/areas/gov/public-services",
            title: "Public Services & Urban Mobility",
            subtitle:
              "Overseeing public utilities, maintenance services, and urban transportation systems",
            icon: Bus,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/community": {
            uri: "/areas/gov/community",
            title: "Community Engagement",
            subtitle:
              "Fostering connections with residents and promoting neighborhood participation",
            icon: Users,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/general": {
            uri: "/areas/gov/general",
            title: "General Secretariat",
            subtitle:
              "Coordinating administrative functions and supporting overall municipal operations",
            icon: FileText,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/legal": {
            uri: "/areas/gov/legal",
            title: "Legal & Institutional Affairs",
            subtitle:
              "Providing legal counsel and managing institutional relationships",
            icon: Scale,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/council": {
            uri: "/areas/gov/council",
            title: "Deliberative Council",
            subtitle:
              "Legislative body responsible for policy-making and municipal governance",
            icon: Landmark,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/accounts": {
            uri: "/areas/gov/accounts",
            title: "Court of Accounts",
            subtitle:
              "Overseeing municipal finances and ensuring proper use of public funds",
            icon: FileText,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/gov/justice": {
            icon: Gavel,
            title: "Misdemeanor Court",
            subtitle:
              "Handling minor legal infractions and maintaining local order",
            uri: "/areas/gov/justice",
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
        },
        sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
      },
      "/areas/personal": {
        uri: "/areas/personal",
        title: "Personal Area",
        subtitle: "Manage your personal information and private data",
        icon: User,
        children: {
          "/areas/personal/profile": {
            uri: "/areas/personal/profile",
            title: "Profile",
            icon: User,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
          "/areas/personal/notifications": {
            uri: "/areas/personal/notifications",
            title: "Notifications",
            icon: Bell,
            sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
          },
        },
        sidebarContent: SidebarContentType.NAV_MAIN_ITEM,
      },
    },
    sidebarContent: SidebarContentType.NAV_MAIN_ROOT,
  },
  "/sign-in": {
    uri: "/sign-in",
    title: "Welcome Back",
    subtitle: "Sign in to your account to continue",
    icon: LogIn,
  },
  "/sign-up": {
    uri: "/sign-up",
    title: "Get Started",
    subtitle: "Create an account to continue",
    icon: UserPlus,
  },
};

export function getRouteNodeByUri(uri: string) {
  const parts = uri.split("/").filter((part) => part !== "");
  let currentNode: Record<string, RouteNode> | undefined = routes;
  let currentUri = "";
  const routeNodeNotFoundError = new Error(
    `Route node not found for URI: ${uri}`
  );

  if (uri === "/") {
    if (!routes["/"]) {
      throw routeNodeNotFoundError;
    }
    return routes["/"];
  }

  for (let i = 0; i < parts.length; i++) {
    currentUri += "/" + parts[i];
    if (!currentNode || !currentNode[currentUri]) {
      throw routeNodeNotFoundError;
    }

    if (i === parts.length - 1) {
      return currentNode[currentUri];
    }
    currentNode = currentNode[currentUri].children;
  }

  throw routeNodeNotFoundError;
}
