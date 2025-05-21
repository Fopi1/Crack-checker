import { useState } from "react";

import { monthNames } from "@/app/(root)/release-calendar/constants";

export const useCalendar = () => {
  const currentDate = new Date();
  const [dateStates, setDateStates] = useState({
    year: currentDate.getFullYear(),
    monthIndex: currentDate.getMonth(),
    month: monthNames[currentDate.getMonth()],
  });
  const { year, monthIndex, month } = dateStates;
  const goToPreviousMonth = () => {
    if (monthIndex === 0) {
      setDateStates({ year: year - 1, monthIndex: 11, month: monthNames[11] });
    } else {
      setDateStates({
        ...dateStates,
        monthIndex: monthIndex - 1,
        month: monthNames[monthIndex - 1],
      });
    }
  };

  const goToToday = () => {
    setDateStates({
      year: currentDate.getFullYear(),
      monthIndex: currentDate.getMonth(),
      month: monthNames[currentDate.getMonth()],
    });
  };

  const goToNextMonth = () => {
    if (monthIndex === 11) {
      setDateStates({ year: year + 1, monthIndex: 0, month: monthNames[0] });
    } else {
      setDateStates({
        ...dateStates,
        monthIndex: monthIndex + 1,
        month: monthNames[monthIndex + 1],
      });
    }
  };

  const getCalendarMatrix = () => {
    const result: { day: number; from: "prev" | "current" | "next" }[][] = [];

    const startDayIndex = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const totalDaysPrevMonth = new Date(year, monthIndex, 0).getDate();
    const weeks = Math.ceil((startDayIndex + totalDays) / 7);

    for (let week = 0; week < weeks; week++) {
      const weekRow: { day: number; from: "prev" | "current" | "next" }[] = [];

      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        const dayOfMonth = cellIndex - startDayIndex + 1;

        if (dayOfMonth < 1) {
          weekRow.push({ day: totalDaysPrevMonth + dayOfMonth, from: "prev" });
        } else if (dayOfMonth > totalDays) {
          weekRow.push({ day: dayOfMonth - totalDays, from: "next" });
        } else {
          weekRow.push({ day: dayOfMonth, from: "current" });
        }
      }

      result.push(weekRow);
    }

    return result;
  };

  const calendarMatrix = getCalendarMatrix();

  return {
    currentDate,
    year,
    calendarMatrix,
    month,
    monthIndex,
    goToPreviousMonth,
    goToToday,
    goToNextMonth,
  };
};
