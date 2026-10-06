import React, { useEffect } from 'react';

interface Doctor {
  id: number;
  fullName: string;
  dateOfBirth: string;
  qualification: string;
  specialist: string;
  email: string;
  phone: string;
}

interface ViewDoctorProps {
  /** Optional success message passed from backend (e.g., via query param or context) */
  successMsg?: string;
  /** Optional error message passed from backend */
  errorMsg?: string;
}

const ViewDoctor: React.FC<ViewDoctorProps> = ({ successMsg, errorMsg }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Fetch the list of doctors from the backend.
    // The endpoint should return JSON in the shape of Doctor[].
    // Adjust the URL to match your actual API contract.
    fetch('/api/doctors')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Doctor[]) => setDoctors(data))
      .catch((err) => console.error('Failed to load doctors:', err));
  }, []);

  return (
    <div className="modern-container p-3">
      <div className="modern-card my-card" style={{ boxShadow: '0 0 10px 1px maroon' }}>
        <div className="card-body">
          <p className="fs-3 text-center text-danger">List of Doctors</p>

          {/* Success message */}
          {successMsg && (
            <div className="alert-box alert-success text-center fs-3">
              {successMsg}
            </div>
          )}

          {/* Error message */}
          {errorMsg && (
            <div className="alert-box alert-danger text-center fs-3">
              {errorMsg}
            </div>
          )}

          {/* Doctors table */}
          <div className="modern-table-wrapper mt-4">
            <table className="table table-striped">
              <thead>
                <tr className="table-info">
                  <th scope="col">Full Name</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Specialist</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th colSpan={2} className="text-center" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <th>{doctor.fullName}</th>
                    <td>{doctor.dateOfBirth}</td>
                    <td>{doctor.qualification}</td>
                    <td>{doctor.specialist}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      <a
                        className="btn btn-sm btn-primary"
                        href={`edit_doctor.jsp?id=${doctor.id}`}
                      >
                        Edit
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-sm btn-danger"
                        href={`../deleteDoctor?id=${doctor.id}`}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
                {doctors.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* End of table */}
        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;