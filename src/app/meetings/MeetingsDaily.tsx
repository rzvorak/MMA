"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  date: Date | undefined;
};

const MeetingsDaily = ({ date }: Props) => {
  const times: String[] = [];

  const startTime = "6:00";
  const endTime = "22:00";

  let [hour, minute] = startTime.split(":");
  let [endHour, endMinute] = endTime.split(":");

  while (Number(hour) <= Number(endHour)) {
    times.push(`${hour}:${minute}`);

    if (minute === "30") {
      hour = String(Number(hour) + 1);
      minute = "00";
    } else {
      minute = "30";
    }
  }

  const isDragging = useRef(false);
  const toggledThisDrag = useRef(new Set<String>());
  const [buttonStates, setButtonStates] = useState<Map<String, boolean>>(
    new Map(times.map((time) => [time, false])),
  );

  const toggleButton = (time: String) => {
    // Prevent toggling the same button multiple times in one drag
    if (toggledThisDrag.current.has(time)) return;

    setButtonStates((prev) => {
      const updated = new Map(prev);
      const current = updated.get(time) || false;
      updated.set(time, !current);
      return updated;
    });

    toggledThisDrag.current.add(time);
  };

  const handleMouseDown = (time: String) => {
    isDragging.current = true;
    toggledThisDrag.current.clear();
    toggleButton(time);
  };

  const handleMouseEnter = (time: String) => {
    if (isDragging.current) {
      toggleButton(time);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    toggledThisDrag.current.clear();
  };

  return (
    <Card className="h-full w-full gap-2 pt-4">
      <CardHeader className="text-semibold text-md">
        {date
          ? "Availability on " +
            date.toLocaleString("en-US", { month: "long" }) +
            " " +
            date.getDate() +
            ":"
          : "Please select a day."}
      </CardHeader>
      <CardContent className="flex max-h-full w-full flex-col px-0">
        <ScrollArea className="m-0 h-[30rem] w-full border">
          <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {Array.from(buttonStates.keys()).map((time, i) => (
              <div
                key={i}
                onMouseDown={() => handleMouseDown(time)}
                onMouseEnter={() => handleMouseEnter(time)}
                className={`border-secondary ${
                  buttonStates.get(time)
                    ? "text-primary bg-[var(--mmared)]"
                    : "bg-background"
                } h-[3rem] w-full cursor-pointer border-t-[0.1rem] pt-1 pl-1 select-none`}
              >
                {time.split(":")[1] !== "30" ? time : null}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MeetingsDaily;
