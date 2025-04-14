import { AppSidebar } from "@/components/AppSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <AppSidebar />
      <div>page</div>
      <SidebarTrigger></SidebarTrigger>
      <DarkModeToggle></DarkModeToggle>
    </>
  );
};

export default HomePage;
