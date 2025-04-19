"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import MeetingsDaily from "./MeetingsDaily";

const MeetingsContent = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex w-full flex-1 flex-col px-4">
      <div className="flex h-full flex-row">
        <div className="flex flex-1 flex-col items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <MeetingsDaily date={date} />
        </div>
      </div>
    </div>
  );
};

export default MeetingsContent;
