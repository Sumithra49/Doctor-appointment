import { eachDayOfInterval, endOfMonth, format, startOfMonth, startOfWeek, endOfWeek, isSameDay, isToday } from "date-fns";
import { useAppointmentContext } from "../context/AppointmentContext";
import { useState } from "react";

interface Props {
  onDateClick: (date: string) => void;
}

const CalendarGrid = ({ onDateClick }: Props) => {
  const { appointments } = useAppointmentContext();
  const [view, setView] = useState<"month" | "week">("month");
  const currentDate = new Date();

  const getDays = () => {
    if (view === "month") {
      return eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
      });
    } else {
      return eachDayOfInterval({
        start: startOfWeek(currentDate, { weekStartsOn: 1 }), // Monday
        end: endOfWeek(currentDate, { weekStartsOn: 1 }),
      });
    }
  };

  const days = getDays();

  const getAppointmentsCount = (dateStr: string) =>
    appointments.filter((apt) => apt.date === dateStr).length;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Calendar</h2>
        <div className="space-x-2">
          <button
            className={`px-4 py-1 rounded ${view === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={`px-4 py-1 rounded ${view === "week" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("week")}
          >
            Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const appointmentCount = getAppointmentsCount(dateStr);

          return (
            <div
              key={dateStr}
              className={`border rounded p-2 cursor-pointer relative hover:bg-blue-100 dark:hover:bg-gray-700 ${
                isToday(day) ? "border-blue-500" : ""
              }`}
              onClick={() => onDateClick(dateStr)}
            >
              <div className="flex justify-between items-center">
                <div>{format(day, "d")}</div>
                {isToday(day) && (
                  <div className="text-xs text-blue-500 font-bold">Today</div>
                )}
              </div>
              <div className="text-xs mt-1">
                {appointmentCount > 0 && (
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-white text-xs ${
                      appointmentCount > 3
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {appointmentCount} Appointments
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
