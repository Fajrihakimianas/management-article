"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function Header() {
  const { logout } = useAuthStore();

  const [open, setOpen] = useState(false);

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

          <Dialog>
            <DialogTrigger asChild>
              <div className="p-3 text-red-500 font-medium flex gap-2 cursor-pointer">
                <LogOut /> Log out
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Logout</DialogTitle>

                <DialogDescription>
                  Are you sure want to logout?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="bg-blue-500" onClick={handleLogout}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}
