import { format, getDay } from "date-fns";
import clsx from "clsx";

export default function DayCell({ day, isSameMonthDay, isToday, holidayName }) {
  const dayLabel = format(day, "d");

  const dayOfWeek = getDay(day);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isHoliday = Boolean(holidayName) && isSameMonthDay;

  return (
    <div
      title={isHoliday ? holidayName : undefined}
      className={clsx("day", {
        "other-month": !isSameMonthDay,
        weekend: isWeekend && isSameMonthDay,
        today: isToday && isSameMonthDay,
        holiday: isHoliday,
      })}
    >
      <span className="day-number">{dayLabel}</span>
      {isHoliday && <span className="holiday-dot" aria-hidden="true"></span>}
    </div>
  );
}