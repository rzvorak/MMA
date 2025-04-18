import { AppSidebar } from "@/components/AppSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SidebarTrigger></SidebarTrigger>
        <DarkModeToggle></DarkModeToggle>
      </div>
    </>
  );
};

export default HomePage;
