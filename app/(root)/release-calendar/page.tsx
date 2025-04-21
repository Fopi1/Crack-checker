"use client";

import { Container } from '@/shared/components/shared';
import { CrackButton } from '@/shared/components/ui';
import { useCalendar } from '@/shared/hooks';
import { useQuery } from '@tanstack/react-query';

import { daysOfWeek, monthNames } from './constants';

// ЧАТ ПРЕДЛОЖИЛ ХОРОШУЮ ИДЕЮ ПАРСИТЬ ИГРЫ ИЗ СВОЕЙ БАЗЫ ДАННЫХ, ВМЕСТО ТОГО ЧТОБЫ ПОЛАГАТЬСЯ НА СТОРОННИЙ API
// НАПИСАТЬ НАДО ФУНКЦИЮ КОТОРАЯ ОТБИРАЕТ ИГРЫ ПО МЕСЯЦУ И ВОЗВРАЩАЕТ СПИСОК ПО ДНЯМ
export default function ReleaseCalendar() {
  const {
    currentDate,
    year,
    calendar,
    month,
    goToPreviousMonth,
    goToToday,
    goToNextMonth,
  } = useCalendar();
  const isTodayDisabled =
    year === currentDate.getFullYear() &&
    month === monthNames[currentDate.getMonth()]
      ? true
      : false;
  const data = useQuery({queryKey:["calendar",month],queryFn: () => {}})
  return (
    <section className="pt-20 bg-crack-secondary min-h-fit">
      <Container className="bg-[#1e1e2033] backdrop-blur-[10px] rounded-lg">
        <div className="p-8 flex flex-col gap-10">
          <h2 className="font-bold text-2xl">Release Calendar</h2>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-5">
              <CrackButton onClick={goToPreviousMonth}>{"<"}</CrackButton>
              <CrackButton disabled={isTodayDisabled} onClick={goToToday}>
                today
              </CrackButton>
              <CrackButton onClick={goToNextMonth}>{">"}</CrackButton>
            </div>
            <h2 className="text-2xl font-bold leading-[29px] capitalize">
              {`${month} ${year}`}
            </h2>
          </div>
          <Container className="w-full">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  {daysOfWeek.map((day) => (
                    <th
                      key={day}
                      className="capitalize size-20 bg-crack-theader border-b border-r border-crack-theader first:rounded-tl-sm last:border-r-0 last:rounded-tr-sm"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.map((week, wIndex) => (
                  <tr key={wIndex}>
                    {week.map(({ day, from }, dIndex) => (
                      <td
                        key={dIndex}
                        className={`${
                          from === "current" ? "text-white" : "text-white/40"
                        } font-bold text-xs text-right p-5 border-b border-r border-crack-theader first:border-l`}
                      >
                        {day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
      </Container>
    </section>
  );
}
