// API service to fetch appointment details
// This simulates the backend call that was previously done in the JSP scriptlet

export interface Appointment {
  id: number;
  userId: number;
  fullName: string;
  gender: string;
  age: string;
  appointmentDate: string;
  email: string;
  phone: string;
  diseases: string;
  doctorId: number;
  address: string;
  status: string;
}

export const fetchAppointmentById = async (id: string): Promise<Appointment> => {
  // Add conditional rendering here
  return fetch(`https://api.example.com/appointments/${id}`)
    .then(response => response.json())
    .then(data => data);
}