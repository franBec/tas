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

export interface RouteNode {
  uri: string;
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: Record<string, RouteNode>;
}

export const routes: Record<string, RouteNode> = {
  "/": {
    uri: "/",
    title: "Municipal Services",
    subtitle: "Your Digital Gateway to Local Government Services",
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
          },
          "/areas/gov/public-services": {
            uri: "/areas/gov/public-services",
            title: "Public Services & Urban Mobility",
            subtitle:
              "Overseeing public utilities, maintenance services, and urban transportation systems",
            icon: Bus,
          },
          "/areas/gov/community": {
            uri: "/areas/gov/community",
            title: "Community Engagement",
            subtitle:
              "Fostering connections with residents and promoting neighborhood participation",
            icon: Users,
          },
          "/areas/gov/general": {
            uri: "/areas/gov/general",
            title: "General Secretariat",
            subtitle:
              "Coordinating administrative functions and supporting overall municipal operations",
            icon: FileText,
          },
          "/areas/gov/legal": {
            uri: "/areas/gov/legal",
            title: "Legal & Institutional Affairs",
            subtitle:
              "Providing legal counsel and managing institutional relationships",
            icon: Scale,
          },
          "/areas/gov/council": {
            uri: "/areas/gov/council",
            title: "Deliberative Council",
            subtitle:
              "Legislative body responsible for policy-making and municipal governance",
            icon: Landmark,
          },
          "/areas/gov/accounts": {
            uri: "/areas/gov/accounts",
            title: "Court of Accounts",
            subtitle:
              "Overseeing municipal finances and ensuring proper use of public funds",
            icon: FileText,
          },
          "/areas/gov/justice": {
            icon: Gavel,
            title: "Misdemeanor Court",
            subtitle:
              "Handling minor legal infractions and maintaining local order",
            uri: "/areas/gov/justice",
          },
        },
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
          },
          "/areas/personal/notifications": {
            uri: "/areas/personal/notifications",
            title: "Notifications",
            icon: Bell,
          },
        },
      },
    },
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

  if (uri === "/") {
    if (!routes["/"]) {
      throw new Error(`Route node not found for URI: ${uri}`);
    }
    return routes["/"];
  }

  for (let i = 0; i < parts.length; i++) {
    currentUri += "/" + parts[i];
    if (!currentNode || !currentNode[currentUri]) {
      throw new Error(`Route node not found for URI: ${uri}`);
    }

    if (i === parts.length - 1) {
      return currentNode[currentUri];
    }
    currentNode = currentNode[currentUri].children;
  }

  throw new Error(`Route node not found for URI: ${uri}`);
}
