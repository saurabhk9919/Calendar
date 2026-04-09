import { useState, useEffect } from "react";

export default function notes() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  return (
    <div className="notes">
      <h3>Notes</h3>
      <textarea
        placeholder="Write notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}