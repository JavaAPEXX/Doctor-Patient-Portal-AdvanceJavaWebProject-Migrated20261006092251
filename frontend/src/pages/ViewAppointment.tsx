import React from 'react';
import { useEffect } from 'react';
import { Appointment } from '../entity/Appointment';
import { Doctor } from '../entity/Doctor';
import { AppointmentDAO } from '../dao/AppointmentDAO';
import { DoctorDAO } from '../dao/DoctorDAO';

const UserAppointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const fetchAppointments = async () => {
    const appDAO = new AppointmentDAO(DBConnection.getConn());
    const list = await appDAO.getAllAppointmentByLoginUser(userObj.getId());
    setAppointments(list);
  };

  const fetchDoctor = async () => {
    const dDAO = new DoctorDAO(DBConnection.getConn());
    const doctor = await dDAO.getDoctorById(apptList.getDoctorId());
    setDoctor(doctor);
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctor();
  }, []);

  return (
    <div>
      <h1>User Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col">Appointment Date</th>
            <th scope="col">Phone</th>
            <th scope="col">Diseases</th>
            <th scope="col">Doctor</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.getId()}>
                <td>{appointment.getFullName()}</td>
                <td>{appointment.getGender()}</td>
                <td>{appointment.getAge()}</td>
                <td>{appointment.getAppointmentDate()}</td>
                <td>{appointment.getPhone()}</td>
                <td>{appointment.getDiseases()}</td>
                <td>
                  {doctor ? doctor.getFullName() : 'Loading...'}
                </td>
                <td>{appointment.getStatus()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointment;