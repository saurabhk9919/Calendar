import { useState, useEffect } from "react";

export default function NotesPanel() {
  const [notes, setNotes] = useState(() => localStorage.getItem("calendarNotes") || "");

  useEffect(() => {
    localStorage.setItem("calendarNotes", notes);
  }, [notes]);

  const handleChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
  };

  return (
    <div className="notes-panel">
      <h3>Notes</h3>
      <textarea
        className="notes-input"
        placeholder=""
        value={notes}
        onChange={handleChange}
      />
    </div>
  );
}
