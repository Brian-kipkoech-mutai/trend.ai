"use client";

import * as React from "react";
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";

import { NavOragnization } from "./nav-organization";
import { ModeToggle } from "./mode-toggle";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  organization: {
    name: "trend.ai",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",

    avatar: "https://www.trendai.app/assets/images/logo.png",
    moto: "Sipmly the   best",
    alt: "org picture",
  },

  navMainbrand: [
    {
      title: "Campaign",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Campaign",
          url: "/dashboard/campaign/create",
        },

        {
          title: "Campaign List",
          url: "/dashboard/campaign/campaign-list",
        },
      ],
    },
    {
      title: "Management",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Influencer Management ",
          url: "/dashboard/influencer-managment",
        },
      ],
    },
  ],
  navMainInfluencer: [
    {
      title: "Campaign",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Campaign List",
          url: "/dashboard/campaign/campaign-list", // Page that lists all campaigns
        },
        {
          title: "My Campaigns",
          url: "/dashboard/campaign/my-campaigns", // Displays the campaigns the influencer has joined
        },
        {
          title: "Submission Status",
          url: "/dashboard/campaign/submission-status", // Page to view the status of submitted content
        },
      ],
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userContext = useUser();
  const user = userContext?.user;
  const role = user?.role;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavOragnization organization={data.organization} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={role == "brand" ? data.navMainbrand : data.navMainInfluencer}
        />
      </SidebarContent>
      <SidebarFooter>
        {" "}
        <ModeToggle />
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
