import { AppSidebar } from "@/components/AppSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar } from "@radix-ui/react-avatar";
import { Settings } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getUser } from "@/actions/users";
import { prisma } from "@/db/prisma";
import Header from "@/components/Header";

const ProfilePage = async () => {
  const user = await getUser();
  const userData = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  const firstName = userData ? userData.firstName : "#";
  const lastName = userData ? userData.lastName : "#";
  const email = userData ? userData.email : "#";
  const createdAt = userData ? userData.createdAt : "#";
  const month = createdAt.toLocaleString("en-US", { month: "long" });
  const year = createdAt.toLocaleString("en-US", { year: "numeric" });

  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col pb-10">
        <Header title="Profile" />

        {/* content */}
        <div className="flex w-full flex-row">
          <div className="flex flex-2 flex-col pr-4 pl-4 lg:pr-12">
            <div className="mb-4 flex flex-row">
              <div className="flex flex-1 flex-col items-center py-4">
                <div className="size-[10rem] sm:size-[12rem] md:size-[14rem]">
                  <Avatar>
                    <AvatarImage src="#" />
                    <AvatarFallback className="bg-sidebar-accent">
                      {firstName.charAt(0)}
                      {lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="mb-5 flex flex-1 flex-col justify-center md:ml-6">
                <h1 className="text-foreground mt-4 text-2xl">
                  {firstName} {lastName}
                </h1>
                <h2 className="text-muted-foreground text-lg">{email}</h2>
                <h3 className="text-muted-foreground text-md">
                  Joined {month} {year}
                </h3>

                <h3 className="text-muted-foreground text-md mt-4">
                  0 Followers 0 Folllowing
                </h3>
              </div>
            </div>
            <div className="bg-secondary h-[0.2rem] w-full"></div>

            <div className="flex h-[20rem] flex-col">
              <div className="w-full p-4">
                <h3 className="text-semibold">Statistics</h3>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2">
                <Card className="bg-background">
                  <CardContent>0 Day Streak</CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent>0 Total XP</CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent>0 Connections</CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent>Beginner</CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="invisible absolute mr-4 flex flex-1 flex-col lg:visible lg:relative">
            <Tabs defaultValue="account" className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account" className="cursor-pointer">
                  Following
                </TabsTrigger>
                <TabsTrigger value="password" className="cursor-pointer">
                  Followers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardContent className="h-[40rem] space-y-2"></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardContent className="h-[40rem] space-y-2"></CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
