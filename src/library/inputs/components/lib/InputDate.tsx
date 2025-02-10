"use client";

import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { LuCalendar } from "react-icons/lu";
import { ControllerRenderProps } from "react-hook-form";
import { ptBR } from "react-day-picker/locale";

export function InputDate({
  field,
}: {
  field: ControllerRenderProps<any, string>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={twMerge(
            "input-base",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          autoFocus
          locale={ptBR}
          className="p-6"
          classNames={{ months: "p-6 bg-red-500", month: "bg-green-500 p-2", month_grid:"" }}
        />
      </PopoverContent>
    </Popover>
  );
}
