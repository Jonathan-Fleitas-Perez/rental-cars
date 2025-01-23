/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { CalendarSelectorProps } from "./CalendarSelector.types";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CalendarSelector(props: CalendarSelectorProps) {
  const { setDateSelected, className , carPriceDays} = props;
  const [date,  setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  
  useEffect(() => {
    setDateSelected({
      from: date?.from,
      to: date?.to,
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const calculateDaysBetween = (from: Date, to: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInTime = to.getTime() - from.getTime();
    return Math.round(diffInTime / oneDay);
  };

  const daysBetween =
    date?.from && date?.to ? calculateDaysBetween(date.from, date.to) : 0;

    console.log(setDate)

  return (
    <>
      <div className={cn("grid gap-2", className)}>
        {date?.from && date?.to && (
          <>
            <p className="mt-4 text-lg text-black">
              Dias Totales {daysBetween}
            </p>
            <p className="mb-4 text-md text-gray-500">
              Precio total : ${daysBetween * Number(carPriceDays)}  (impuestos incluidos)
            </p>
          </>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date?.to ? (
                  <>
                    {format(date.from, "LLL dd,y")} - {""}
                    {format(date.to, "LLL dd,y")}
                  </>
                ) : (
                  format(date.from, "LLL dd,y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" >
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              onSelect={(range)=>{setDate(range)}}
              selected={date}
              numberOfMonths={1}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
