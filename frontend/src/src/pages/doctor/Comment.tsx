import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { fetchAppointmentById } from '../../services/api';

interface Appointment {
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

const Comment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('id');

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for the editable field (comment)
  const [comment, setComment] = useState('');

  // Message states (simulating session attributes from JSP)
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if doctor is logged in (simulating <c:if test="${empty doctorObj}">)
  useEffect(() => {
    // In a real app, this would check auth context
    // For this migration, we assume the route is protected or check a mock auth state
    const isLoggedIn = localStorage.getItem('doctorLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/doctor_login', { replace: true });
      return;
    }

    if (appointmentId) {
      loadAppointment(appointmentId);
    }
  }, [appointmentId, navigate]);

  const loadAppointment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulating the JSP scriptlet:
      // int id = Integer.parseInt(request.getParameter("id"));
      // AppointmentDAO appDAO = new AppointmentDAO(DBConnection.getConn());
      // Appointment appointment = appDAO.getAppointmentById(id);
      
      const data = await fetchAppointmentById(id);
      setAppointment(data);
    } catch (err) {
      setError('Failed to load appointment details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!appointment) return;

    // Prepare form data matching the JSP form fields
    const formData = new FormData();
    formData.append('fullName', appointment.fullName);
    formData.append('age', appointment.age);
    formData.append('phone', appointment.phone);
    formData.append('diseases', appointment.diseases);
    formData.append('comment', comment);
    formData.append('id', appointment.id.toString());
    formData.append('doctorId', appointment.doctorId.toString());
    
    // Note: userId was commented out in the source JSP, so we do not include it.

    try {
      // Simulating POST to ../updateStatus
      const response = await fetch('/updateStatus', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSuccessMsg(result.message || 'Comment submitted successfully.');
          setComment(''); // Reset comment field
        } else {
          setErrorMsg(result.message || 'Failed to submit comment.');
        }
      } else {
        setErrorMsg('Server error occurred.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="modern-container">
        <div className="modern-card">
          <div className="card-body text-center">
            <p>Loading appointment details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modern-container">
        <div className="modern-card">
          <div className="card-body text-center">
            <div className="alert-box alert-danger">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  return (
    <>
      <Navbar />

      {/* 1st Div: Background Image Header */}
      <div className="modern-bg-header">
        <p className="text-center fs-2 text-white"></p>
      </div>

      {/* 2nd Div: Main Content */}
      <div className="modern-container p-3">
        <p className="fs-2"></p>

        <div className="row">
          {/* col-2 */}
          <div className="col-md-6 offset-md-3">
            <div className="modern-card my-card">
              <div className="card-body">
                <h2 className="text-center fs-3 mb-4">Leave a Treatment Comment</h2>

                {/* Success Message */}
                {successMsg && (
                  <div className="alert-box alert-success text-center mb-3">
                    {successMsg}
                  </div>
                )}

                {/* Error Message */}
                {errorMsg && (
                  <div className="alert-box alert-danger text-center mb-3">
                    {errorMsg}
                  </div>
                )}

                {/* Form */}
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter full name"
                      className="form-control"
                      readOnly
                      value={appointment.fullName}
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="age">Age</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your Age"
                      className="form-control"
                      readOnly
                      value={appointment.age}
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      maxLength={11}
                      placeholder="Enter Mobile no."
                      className="form-control"
                      readOnly
                      value={appointment.phone}
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label" htmlFor="diseases">Diseases</label>
                    <input
                      id="diseases"
                      name="diseases"
                      type="text"
                      placeholder="Enter diseases"
                      className="form-control"
                      readOnly
                      value={appointment.diseases}
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <label className="form-label" htmlFor="comment">Leave a Comment / Prescription</label>
                    <textarea
                      id="comment"
                      name="comment"
                      placeholder="Leave a comment"
                      className="form-control"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  {/* Hidden Fields */}
                  <input type="hidden" name="id" value={appointment.id} />
                  <input type="hidden" name="doctorId" value={appointment.doctorId} />

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;