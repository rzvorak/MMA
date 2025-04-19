"use client";

import React from "react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import DarkModeToggle from "./DarkModeToggle";
import { Settings } from "lucide-react";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="flex flex-col justify-center p-4 font-semibold">
      <div className="mb-3 flex w-full flex-row items-center justify-center">
        <div className="flex-1 justify-start">
          <Button
            asChild
            size="icon"
            className="cursor-pointer"
            variant="ghost"
          >
            <SidebarTrigger></SidebarTrigger>
          </Button>
        </div>
        <h3 className="flex-1 text-center">{title}</h3>
        <div className="flex flex-1 flex-row justify-end">
          <DarkModeToggle></DarkModeToggle>
          <Button size="icon" className="cursor-pointer" variant="ghost">
            <Settings />
          </Button>
        </div>
      </div>
      <div className="bg-secondary h-[0.2rem] w-full"></div>
    </div>
  );
};

export default Header;
