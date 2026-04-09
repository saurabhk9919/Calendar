import { useState } from "react";

export default function useDateRange() {
  const [range, setRange] = useState({ start: null, end: null });

  const selectDate = (date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else {
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  return { range, selectDate };
}