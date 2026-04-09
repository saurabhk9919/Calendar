import { useState, useEffect } from "react";

export default function NotesPanel() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("calendarNotes");
    if (saved) setNotes(saved);
  }, []);

  const handleChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem("calendarNotes", newNotes);
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
