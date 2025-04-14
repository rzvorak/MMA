"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Crown, Home, Inbox, ListTodo, Search } from "lucide-react";
import Link from "next/link";
import LogoByTheme from "./LogoByTheme";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { logOutAction } from "@/actions/users";

const items = [
  {
    title: "Home",
    url: "#",
    icon: <Home />,
  },
  {
    title: "Search",
    url: "#",
    icon: <Search />,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <Inbox />,
  },
  {
    title: "Leaderboard",
    url: "#",
    icon: <Crown />,
  },
  {
    title: "Tasks",
    url: "#",
    icon: <ListTodo />,
  },
];

export function AppSidebar() {
  const userName = "Current User";
  const email = "example@gmail.com";

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
    <Sidebar>
      <SidebarHeader>
        <div className="mt-[0.3rem] ml-[0.3rem] h-[5rem] w-[5rem]">
          <LogoByTheme></LogoByTheme>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="h-full p-[0rem]">
                    <Link
                      href={item.url}
                      className="h-full w-full px-[1rem] py-[0.8rem]"
                    >
                      <div className="flex w-full flex-row items-center">
                        <div>{item.icon}</div>
                        <div className="mb-[0.2rem] ml-[1rem] text-lg">
                          {item.title}
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <DropdownMenu>
              <div className="w-full">
                <DropdownMenuTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full rounded-md">
                  <div className="flex h-[4rem] w-full cursor-pointer flex-row items-center">
                    <div className="size-[3.5rem]">
                      <Avatar>
                        <AvatarImage src="#" />
                        <AvatarFallback className="bg-sidebar-accent">
                          RZ
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="mb-[0.3rem] flex h-full flex-1 flex-col items-start justify-center pl-[1.2rem]">
                      <h2 className="text-lg">{userName}</h2>
                      <span className="text-md">{email}</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="w-full">
                  <button className="cursor-pointer" onClick={handleLogout}>
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
