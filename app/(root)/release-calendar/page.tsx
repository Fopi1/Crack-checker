"use client";

import { Container, Error, Loader } from "@/shared/components/shared";
import { useCalendar, useGamesByDate } from "@/shared/hooks";
import { CalendarHeader } from "./calendarHeader";
import { CalendarTableGrid, CalendarTableHeader } from "./table";
import { CalendarGrid } from "./calendarGrid";
import { useEffect, useState } from "react";

export default function ReleaseCalendar() {
  const {
    currentDate,
    year,
    calendarMatrix,
    month,
    monthIndex,
    goToPreviousMonth,
    goToToday,
    goToNextMonth,
  } = useCalendar();
  const [debouncedYear, setDebouncedYear] = useState(year);
  const [debouncedMonthIndex, setDebouncedMonthIndex] = useState(monthIndex);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedYear(year);
      setDebouncedMonthIndex(monthIndex);
    }, 500);

    return () => clearTimeout(timeout);
  }, [year, monthIndex]);
  const isTodayDisabled =
    year === currentDate.getFullYear() && monthIndex === currentDate.getMonth()
      ? true
      : false;
  const {
    data: games,
    isFetching,
    isError,
  } = useGamesByDate(debouncedYear, debouncedMonthIndex + 1);
  const isGridHidden = isFetching || isError || (games && games.length <= 0);
  return (
    <section className="pt-20 bg-crack-secondary min-h-fit">
      <Container className="bg-[#1e1e2033] backdrop-blur-[10px] rounded-lg">
        <div className="p-8 flex flex-col gap-10">
          <h2 className="font-bold text-2xl">Release Calendar</h2>
          <CalendarHeader
            month={month}
            year={year}
            isTodayDisabled={isTodayDisabled}
            goToNextMonth={goToNextMonth}
            goToToday={goToToday}
            goToPreviousMonth={goToPreviousMonth}
          />
          <Container className="w-full">
            <table
              className="w-full hidden sm:table-fixed 2xl:table"
              style={isGridHidden ? { display: "none" } : {}}
            >
              <CalendarTableHeader />
              <CalendarTableGrid
                calendarMatrix={calendarMatrix}
                games={games}
              />
            </table>
            <div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:hidden"
              style={isGridHidden ? { display: "none" } : {}}
            >
              <CalendarGrid calendarMatrix={calendarMatrix} games={games} />
            </div>
            <Loader className={`${isFetching && !isError ? "" : "hidden"}`} />
            <Error
              className={`${isError || (!isFetching && isGridHidden) ? "" : "hidden"}`}
            />
          </Container>
        </div>
      </Container>
    </section>
  );
}
