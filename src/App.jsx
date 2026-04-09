import Calendar from "./components/calendar";

export default function App() {
  return (
    <div className="page-shell mode-day">
      <div className="app">
        <Calendar isDayMode={true} />
      </div>
    </div>
  );
}