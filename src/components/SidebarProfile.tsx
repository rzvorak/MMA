"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { logOutAction } from "@/actions/users";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
};

const SidebarProfile = ({ firstName, lastName, email }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast("Logged out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast("Error", {
        description: "Error logging out",
      });
    }
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <div className="w-full">
        <DropdownMenuTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full rounded-md">
          <div className="flex h-[4rem] w-full cursor-pointer flex-row items-center">
            <div className="size-[3.5rem]">
              <Avatar>
                <AvatarImage src="#" />
                <AvatarFallback className="bg-sidebar-accent">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="mb-[0.3rem] flex h-full flex-1 flex-col items-start justify-center pl-[1.2rem]">
              <h2 className="text-lg">
                {firstName} {lastName}
              </h2>
              <span className="text-md">{email}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="w-full">
          <button className="cursor-pointer" onClick={handleLogout}>
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarProfile;
