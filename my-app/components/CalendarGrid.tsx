import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { useAppointmentContext } from "../context/AppointmentContext";

interface Props {
  onDateClick: (date: string) => void;
}

const CalendarGrid = ({ onDateClick }: Props) => {
  const { appointments } = useAppointmentContext();
  const currentMonth = new Date();

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getAppointmentsCount = (dateStr: string) =>
    appointments.filter((apt) => apt.date === dateStr).length;

  return (
    <div className="grid grid-cols-7 gap-2 p-4">
      {days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        return (
          <div
            key={dateStr}
            className="border rounded p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
            onClick={() => onDateClick(dateStr)}
          >
            <div>{format(day, "d")}</div>
            <div className="text-xs text-gray-500">
              {getAppointmentsCount(dateStr)} Appointments
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
