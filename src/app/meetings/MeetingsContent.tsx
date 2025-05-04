"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import MeetingsDaily from "./MeetingsDaily";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Role } from "@prisma/client";

type Props = {
  mentors: {
    firstName: string;
    id: string;
    role: Role;
    email: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const MeetingsContent = ({ mentors }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-full flex-1 flex-col px-4">
      <div className="xs:gap-0 xs:flex-row flex h-full flex-col gap-8">
        <div className="flex flex-1 flex-col items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="mt-4 w-full" asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-4/5 justify-between"
              >
                {value
                  ? (() => {
                      const mentor = mentors.find(
                        (mentor) =>
                          mentor.firstName + " " + mentor.lastName === value,
                      );
                      return mentor
                        ? mentor.firstName + " " + mentor.lastName
                        : "Select a mentor";
                    })()
                  : "Select a mentor"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search mentors..." />
                <CommandList>
                  <CommandEmpty>No mentor found.</CommandEmpty>
                  <CommandGroup>
                    {mentors.map((mentor) => (
                      <CommandItem
                        key={mentor.id}
                        value={mentor.firstName + " " + mentor.lastName}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {mentor.firstName + " " + mentor.lastName}
                        <Check
                          className={
                            value === mentor.firstName + " " + mentor.lastName
                              ? "ml-auto opacity-100"
                              : "ml-auto opacity-0"
                          }
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <MeetingsDaily date={date} />
        </div>
      </div>
    </div>
  );
};

export default MeetingsContent;
