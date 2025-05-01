"use client";

import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Calendar, Crown, Home, Inbox, ListTodo, Pencil, Search } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/home",
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
  {
    title: "Meetings",
    url: "/meetings",
    icon: <Calendar />,
  },
  {
    title: "Create",
    url: "/create",
    icon: <Pencil />,
  },
];

const SidebarItems = () => {
  return items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton className="h-full p-[0rem]">
        <Link href={item.url} className="h-full w-full px-[1rem] py-[0.8rem]">
          <div className="flex w-full flex-row items-center">
            <div>{item.icon}</div>
            <div className="mb-[0.2rem] ml-[1rem] text-lg">{item.title}</div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
};

export default SidebarItems;
