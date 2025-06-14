"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LogOut,
  Newspaper,
  Tag,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  projects: [
    {
      title: "Articles",
      url: "articles",
      icon: Newspaper,
    },
    {
      title: "Category",
      url: "categories",
      icon: Tag,
    },
    {
      title: "Logout",
      url: "logout",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ onMenuSelect, activeMenu, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-blue-600">
        <Image
          src="/images/logo-ipsum-white.png"
          alt="Logo"
          width={150}
          height={50}
          className="p-3"
        />
      </SidebarHeader>
      <SidebarContent className="bg-blue-600">
        <NavMain
          items={data.projects}
          onMenuSelect={onMenuSelect}
          activeMenu={activeMenu}
        />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
