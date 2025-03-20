"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useAppointmentContext } from "../context/AppointmentContext";

interface Props {
  date: string;
  selectedAppointment?: any;
  onClose: () => void;
}

const AppointmentModal = ({ date, selectedAppointment, onClose }: Props) => {
  const { addAppointment, editAppointment, deleteAppointment } = useAppointmentContext();

  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (selectedAppointment) {
      setDoctorName(selectedAppointment.doctorName);
      setPatientName(selectedAppointment.patientName);
      setTime(selectedAppointment.time);
      setReason(selectedAppointment.reason);
    }
  }, [selectedAppointment]);

  const handleSubmit = () => {
    if (!doctorName || !patientName || !time) {
      toast.error("Please fill in all fields");
      return;
    }
    const appointment = {
      id: selectedAppointment ? selectedAppointment.id : uuidv4(),
      doctorName,
      patientName,
      time,
      date,
      reason,
    };

    if (selectedAppointment) {
      editAppointment(appointment);
      toast.success("Appointment Updated");
    } else {
      addAppointment(appointment);
      toast.success("Appointment Booked");
    }
    onClose();
  };

  const handleDelete = () => {
    deleteAppointment(selectedAppointment.id);
    toast.info("Appointment Deleted");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded w-96">
        <h2 className="text-lg mb-4">{selectedAppointment ? "Edit" : "Book"} Appointment</h2>
        <input
          type="text"
          placeholder="Doctor Name"
          className="border p-2 w-full mb-2"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patient Name"
          className="border p-2 w-full mb-2"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full mb-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          placeholder="Reason"
          className="border p-2 w-full mb-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-between">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
            {selectedAppointment ? "Update" : "Book"}
          </button>
          {selectedAppointment && (
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          )}
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
