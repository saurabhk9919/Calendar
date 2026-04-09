import { useMemo, useState } from "react";
import { addMonths, format, isSameMonth, isToday, subMonths } from "date-fns";
import { getCalendarDays } from "../utils/calendar";
import DayCell from "./daycell";
import NotesPanel from "./NotesPanel";

const THEMES = [
  {
    id: "alpine",
    label: "Alpine",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  },
  {
    id: "sunset",
    label: "Sunset",
    image:
      "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=800&h=400&fit=crop",
  },
  {
    id: "forest",
    label: "Forest",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=400&fit=crop",
  },
];

const HOLIDAYS = {
  "01-01": "New Year's Day",
  "02-14": "Valentine's Day",
  "03-08": "Women's Day",
  "04-22": "Earth Day",
  "08-15": "Independence Day",
  "10-31": "Halloween",
  "12-25": "Christmas Day",
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [themeIndex, setThemeIndex] = useState(0);
  const days = useMemo(() => getCalendarDays(currentDate), [currentDate]);
  const activeTheme = THEMES[themeIndex];

  const dayHeaders = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const shiftMonth = (offset) => {
    setCurrentDate((prev) => (offset > 0 ? addMonths(prev, 1) : subMonths(prev, 1)));
  };

  const rotateTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  const getHolidayName = (day) => HOLIDAYS[format(day, "MM-dd")] || null;

  return (
    <div className="calendar-scene">
      <div className="spiral-binding" aria-hidden="true"></div>
      <div className="hanger-wire" aria-hidden="true"></div>
      <div className={`calendar-wrapper theme-${activeTheme.id}`}>
        {/* Hero Image Section */}
        <div className="hero-section">
          <div className="hero-controls">
            <button
              type="button"
              className="nav-button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
            >
              ←
            </button>
            <button
              type="button"
              className="theme-button"
              onClick={rotateTheme}
              aria-label="Change theme"
            >
              <span className="theme-swatch" aria-hidden="true"></span>
            </button>
            <button
              type="button"
              className="nav-button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              →
            </button>
          </div>
          <img
            src={activeTheme.image}
            alt="Mountain climbing"
            className="hero-image"
          />
          <div className="blue-accent blue-left" aria-hidden="true"></div>
          <div className="blue-accent blue-right" aria-hidden="true"></div>
          <div className="month-badge">
            <span className="badge-year">{format(currentDate, "yyyy")}</span>
            <span className="badge-month">{format(currentDate, "MMMM")}</span>
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
                <div
                  key={`header-${i}`}
                  className={`weekday-header${i >= 5 ? " weekend-header" : ""}`}
                >
                  {header}
                </div>
              ))}
            </div>

            <div className="calendar-grid month-animate" key={format(currentDate, "yyyy-MM")}> 
              {days.map((day, i) => (
                <DayCell
                  key={i}
                  day={day}
                  isSameMonthDay={isSameMonth(day, currentDate)}
                  isToday={isToday(day)}
                  holidayName={getHolidayName(day)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}