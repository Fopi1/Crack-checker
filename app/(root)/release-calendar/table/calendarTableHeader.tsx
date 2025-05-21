import { daysOfWeek } from "../constants";

export const CalendarTableHeader = () => {
  return (
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
  );
};
