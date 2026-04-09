import { format, isSameDay, isWithinInterval, getDay, isSameMonth } from "date-fns";
import clsx from "clsx";

export default function DayCell({ day, range, selectDate, isSameMonthDay, isToday }) {
    if (!isSameMonthDay) return;
  const isStart = range.start && isSameDay(day, range.start);
  const isEnd = range.end && isSameDay(day, range.end);

  const isBetween =
    range.start &&
    range.end &&
    isWithinInterval(day, { start: range.start, end: range.end });

  const dayOfWeek = getDay(day);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const handleClick = () => {
    if (isSameMonthDay) {
      selectDate(day);
    }
  };

  return (
    <div
      onClick={handleClick}
        className={clsx("day", {
          start: isStart,
          end: isEnd,
          between: isBetween,
          "other-month": !isSameMonthDay,
          weekend: isWeekend && isSameMonthDay,
          today: isToday && isSameMonthDay,
        })}
    >
      {format(day, "d")}
    </div>
  );
}