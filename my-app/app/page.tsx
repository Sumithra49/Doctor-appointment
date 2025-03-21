"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentModal from "../components/AppointmentModal";
import CalendarGrid from "../components/CalendarGrid";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // <-- Import Sidebar
import { AppointmentProvider, useAppointmentContext } from "../context/AppointmentContext";

const Main = () => {
  const { appointments } = useAppointmentContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState("dashboard"); // <-- Add this state

  const openModal = (date: string) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: any) => {
    setSelectedDate(appointment.date);
    setSelectedAppointment(appointment);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Navbar />

        {/* Conditional Rendering */}
        {currentView === "dashboard" && (
          <>
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
          </>
        )}

        {currentView === "appointments" && (
          <>
            <CalendarGrid onDateClick={openModal} />
          </>
        )}
      </div>

      {/* Modal */}
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
