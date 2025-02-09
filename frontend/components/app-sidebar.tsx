"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
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

  navMain: [
    {
      title: "Campaign",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Campaign",
          url: "dashboard/campaign/create",
        },

        {
          title: "Campaign List",
          url: "dashboard/campaign-list",
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
          url: "dashboard/influencer-managment",
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavOragnization organization={data.organization} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
