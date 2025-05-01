import { AppSidebar } from "@/components/AppSidebar";
import CreateContent from "@/components/CreateContent";
import Header from "@/components/Header";
import MeetingsContent from "@/components/MeetingsContent";
import { prisma } from "@/db/prisma";
import React from "react";

const CreatePage = async () => {

  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col pb-10">
        <Header title="Create" />
        <CreateContent />
      </div>
    </>
  );
};

export default CreatePage;
