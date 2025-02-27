"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  dateState?: [Date, React.Dispatch<React.SetStateAction<Date>>];
  defaultValue?: Date;
  className?: string;
}

export function DatePicker({
  dateState,
  defaultValue,
  className,
}: DatePickerProps) {
  const internalState = React.useState(defaultValue);
  const [date, setDate] = dateState || internalState;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-[240px] justify-start text-left font-normal ${className}`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(v) => setDate(v || new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
