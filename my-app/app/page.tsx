"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentModal from "../components/AppointmentModal";
import CalendarGrid from "../components/CalendarGrid";
import Navbar from "../components/Navbar";
import { AppointmentProvider, useAppointmentContext } from "../context/AppointmentContext";

const Main = () => {
  const { appointments } = useAppointmentContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  const openModal = (date: string) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: any) => {
    setSelectedDate(appointment.date);
    setSelectedAppointment(appointment);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <CalendarGrid onDateClick={openModal} />
      <div className="p-4">
        <h2 className="text-lg mb-2">Appointments List</h2>
        <ul>
          {appointments.map((apt) => (
            <li key={apt.id} className="border-b py-2 flex justify-between">
              <div>
                {apt.date} - {apt.time} - {apt.doctorName} with {apt.patientName}
              </div>
              <button onClick={() => handleEdit(apt)} className="text-blue-500">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedDate && (
        <AppointmentModal
          date={selectedDate}
          selectedAppointment={selectedAppointment}
          onClose={() => setSelectedDate("")}
        />
      )}
      <ToastContainer />
    </div>
  );
};

const HomePage = () => (
  <AppointmentProvider>
    <Main />
  </AppointmentProvider>
);

export default HomePage;
