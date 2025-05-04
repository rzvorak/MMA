//import { getAllMentors } from "@/actions/users";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import MeetingsContent from "@/app/meetings/MeetingsContent";
import { prisma } from "@/db/prisma";
import React from "react";

const MeetingsPage = async () => {
  const mentors = await prisma.user.findMany({
    where: { role: "MENTOR" },
  });

  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col pb-10">
        <Header title="Meetings" />
        <MeetingsContent mentors={mentors} />
      </div>
    </>
  );
};

export default MeetingsPage;
