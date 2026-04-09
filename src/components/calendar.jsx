import { useState } from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { getCalendarDays } from "../utils/calendar";
import useDateRange from "../hooks/useDateRange";
import DayCell from "./daycell";
import NotesPanel from "./NotesPanel";

export default function Calendar() {
  const [currentDate] = useState(new Date());
  const days = getCalendarDays(currentDate);
  const { range, selectDate } = useDateRange();

  const dayHeaders = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="calendar-scene">
      <div className="spiral-binding" aria-hidden="true"></div>
      <div className="hanger-wire" aria-hidden="true"></div>
      <div className="calendar-wrapper">
        {/* Hero Image Section */}
        <div className="hero-section">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            alt="Mountain climbing"
            className="hero-image"
          />
          <div className="blue-accent blue-left" aria-hidden="true"></div>
          <div className="blue-accent blue-right" aria-hidden="true"></div>
          <div className="month-badge">
            {format(currentDate, "MMMM")}
            <br />
            {format(currentDate, "yyyy")}
          </div>
        </div>

        {/* Content Section - Notes & Calendar Grid */}
        <div className="calendar-content">
          {/* Left: Notes Panel */}
          <div className="notes-column">
            <NotesPanel />
          </div>

          {/* Right: Calendar Grid */}
          <div className="calendar-column">
            <div className="weekday-headers">
              {dayHeaders.map((header, i) => (
                <div key={`header-${i}`} className="weekday-header">
                  {header}
                </div>
              ))}
            </div>

            <div className="calendar-grid">
              {days.map((day, i) => (
                <DayCell
                  key={i}
                  day={day}
                  range={range}
                  selectDate={selectDate}
                  isSameMonthDay={isSameMonth(day, currentDate)}
                  isToday={isToday(day)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}