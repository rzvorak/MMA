import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import MeetingsContent from "@/components/MeetingsContent";
import React from "react";

const MeetingsPage = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col pb-10">
        {/* header */}
        <Header title="Meetings" />

        {/* content */}
        <MeetingsContent />
      </div>
    </>
  );
};

export default MeetingsPage;
