"use client";

import { AppSidebar } from "@/components/admin/app-sidebar";
import TableArticle from "@/components/admin/data-article/TableArticle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useState } from "react";

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("articles");

  const renderContent = () => {
    switch (activeMenu) {
      case "articles":
        return <TableArticle />;
      case "categories":
        return "categories";
      default:
        return "Welcome to the Dashboard";
    }
  };

  const getPageTitle = () => {
    switch (activeMenu) {
      case "articles":
        return "Articles";
      case "categories":
        return "Categories";
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onMenuSelect={setActiveMenu} activeMenu={activeMenu} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
        </header>

        <div className="bg-gray-100 flex flex-1 flex-col gap-4 p-4 pt-3">
          <div className="flex-1">{renderContent()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
