"use client";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

export default function Header() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="w-full border-b px-8 py-6 flex justify-between items-center">
      <Image
        src="/images/logo-ipsum.png"
        alt="Header Image"
        width={100}
        height={100}
        className="object-cover"
      />

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center cursor-pointer gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>

            <p className="text-sm font-semibold underline text-slate-900">
              Shadcn
            </p>
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <div className="p-4 border-b">
            <h4 className="text-sm leading-none font-normal">My Account</h4>
          </div>

          <div
            className="p-3 text-red-500 font-medium flex gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut /> Log out
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
