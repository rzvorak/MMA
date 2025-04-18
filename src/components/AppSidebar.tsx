"use server";

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

import LogoByTheme from "./LogoByTheme";

import { logOutAction, getUser } from "@/actions/users";
import { prisma } from "@/db/prisma";
import SidebarItems from "./SidebarItems";
import SidebarProfile from "./SidebarProfile";

export async function AppSidebar() {
  const user = await getUser();
  const userData = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  const firstName = userData ? userData.firstName : "#";
  const lastName = userData ? userData.lastName : "#";
  const email = userData ? userData.email : "#";

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
              <SidebarItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarProfile
              firstName={firstName}
              lastName={lastName}
              email={email}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
