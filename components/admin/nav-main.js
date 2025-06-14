"use client";

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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items, onMenuSelect, activeMenu }) {
  const handleMenuClick = (url) => {
    if (url === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
      return;
    }

    if (onMenuSelect) {
      onMenuSelect(url);
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title} className="px-2">
            <SidebarMenuButton
              onClick={() => handleMenuClick(item.url)}
              className={
                activeMenu === item.url
                  ? "bg-blue-500 text-white font-normal rounded-sm"
                  : "cursor-pointer text-white"
              }
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
