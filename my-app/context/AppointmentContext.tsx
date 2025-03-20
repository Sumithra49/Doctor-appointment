import React, { createContext, useContext, useState } from "react";

type Appointment = {
  id: string;
  doctorName: string;
  patientName: string;
  reason: string;
  date: string;
  time: string;
};

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  editAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointmentContext must be used inside AppointmentProvider");
  return context;
};

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const editAppointment = (updated: Appointment) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === updated.id ? updated : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, editAppointment, deleteAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
