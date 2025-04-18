import { AppSidebar } from "@/components/AppSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar } from "@radix-ui/react-avatar";
import { Settings } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        {/* header */}
        <div className="flex flex-col justify-center p-4 font-semibold">
          <div className="mb-3 flex w-full flex-row items-center justify-center">
            <div className="flex-1 justify-start">
              <Button
                asChild
                size="icon"
                className="visible md:hidden"
                variant="ghost"
              >
                <SidebarTrigger></SidebarTrigger>
              </Button>
            </div>
            <h3 className="flex-1 text-center">Profile</h3>
            <div className="flex flex-1 flex-row justify-end">
              <DarkModeToggle></DarkModeToggle>
              <Button size="icon" variant="ghost">
                <Settings />
              </Button>
            </div>
          </div>
          <div className="bg-secondary h-[0.2rem] w-full"></div>
        </div>

        <div className="flex h-[20rem] w-full flex-row">
          <div className="flex flex-1 flex-col items-center">
            <div className="mt-4 size-[10rem] sm:size-[12rem] md:size-[14rem] lg:size-[16rem]">
              <Avatar>
                <AvatarImage src="#" />
                <AvatarFallback className="bg-sidebar-accent">
                  RZ
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="text-foreground mt-4 text-2xl">Ryder Zvorak</h1>
            <h1 className="text-muted-foreground text-lg">
              ryderzvorak@gmail.com
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
