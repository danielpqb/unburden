"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return <DayPicker {...props} />;
}
Calendar.displayName = "Calendar";

export { Calendar };
