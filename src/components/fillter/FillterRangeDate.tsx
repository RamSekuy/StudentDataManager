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
import useSP from "@/hooks/useSP";

export function FillterRangeDate({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { replace, sp } = useSP();
  const before = sp.get("before");
  const after = sp.get("after");
  const dateFormat = (s: string) => new Date(Number(s));
  const date = {
    from: !after ? undefined : dateFormat(after),
    to: !before ? undefined : dateFormat(before),
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={after ? dateFormat(after) : undefined}
            selected={date}
            onSelect={(v) => {
              const spValue = (key: string, date?: Date) => ({
                key,
                value: date ? String(date.getTime()) : undefined,
              });
              replace(spValue("before", v?.to), spValue("after", v?.from));
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
