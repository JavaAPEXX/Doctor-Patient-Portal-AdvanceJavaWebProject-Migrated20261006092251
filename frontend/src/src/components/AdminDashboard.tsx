import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; // contains .my-card style
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

/**
 * AdminDashboard component
 *
 * This component is a direct conversion of the legacy `index.jsp` page.
 * It preserves all UI structure, styling, conditional rendering, and
 * form behaviour while adopting a modern React/TypeScript approach.
 *
 * Props:
 *   - adminObj: any (presence indicates an authenticated admin)
 *
 * Note: The component expects the following backend endpoints:
 *   - GET   /api/admin/dashboard   → { totalDoctor, totalUser, totalAppointment, totalSpecialist }
 *   - GET   /api/admin/messages    → { successMsg?, errorMsg? }
 *   - POST  /api/admin/addSpecialist  (body: { specialistName })
 *
 * These endpoints are inferred from the original JSP logic and should
 * exist in the unchanged backend. If the actual endpoints differ,
 * adjust the URLs accordingly.
 */
interface DashboardCounts {
  totalDoctor: number;
  totalUser: number;
  totalAppointment: number;
  totalSpecialist: number;
}

interface Messages {
  successMsg?: string;
  errorMsg?: string;
}

interface AdminDashboardProps {
  adminObj?: any;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminObj }) => {
  const navigate = useNavigate();

  // Redirect to login if adminObj is missing
  useEffect(() => {
    if (!adminObj) {
      navigate('/admin_login');
    }
  }, [adminObj, navigate]);

  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [messages, setMessages] = useState<Messages>({});
  const [specialistName, setSpecialistName] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Fetch dashboard counts
  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then(setCounts)
      .catch(console.error);
  }, []);

  // Fetch any flash messages
  useEffect(() => {
    fetch('/api/admin/messages')
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  const handleAddSpecialist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specialistName.trim()) return;

    try {
      const res = await fetch('/api/admin/addSpecialist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialistName }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages({ errorMsg: err });
      } else {
        setMessages({ successMsg: 'Specialist added successfully.' });
        setSpecialistName('');
        // Refresh counts after adding specialist
        const updated = await fetch('/api/admin/dashboard').then((r) => r.json());
        setCounts(updated);
      }
    } catch (err) {
      console.error(err);
      setMessages({ errorMsg: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="modern-container p-5">
      <p className="text-center text-danger fs-3">Admin Dashboard</p>

      {/* Success message */}
      {messages.successMsg && (
        <div className="alert-box alert alert-success text-center fs-5">
          {messages.successMsg}
        </div>
      )}

      {/* Error message */}
      {messages.errorMsg && (
        <div className="alert-box alert alert-danger text-center fs-5">
          {messages.errorMsg}
        </div>
      )}

      {counts && (
        <div className="row">
          {/* Doctor card */}
          <div className="col-md-4">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-user-doctor fa-3x"></i>
                <br />
                <p className="fs-4 text-center">
                  Doctor <br />
                  {counts.totalDoctor}
                </p>
              </div>
            </div>
          </div>

          {/* User card */}
          <div className="col-md-4">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fas fa-user-circle fa-3x"></i>
                <br />
                <p className="fs-4 text-center">
                  User <br />
                  {counts.totalUser}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment card */}
          <div className="col-md-4">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-calendar-check fa-3x"></i>
                <br />
                <p className="fs-4 text-center">
                  Total Appointment <br />
                  {counts.totalAppointment}
                </p>
              </div>
            </div>
          </div>

          {/* Specialist card (opens modal) */}
          <div className="col-md-4 mt-2">
            <div
              className="card my-card"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-user-doctor fa-3x"></i>
                <br />
                <p className="fs-4 text-center">
                  Specialist <br />
                  {counts.totalSpecialist}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialist modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="exampleModalLabel">
                Add Specialist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddSpecialist}>
                <div className="mb-3">
                  <label className="form-label">Specialist Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={specialistName}
                    onChange={(e) = /> setSpecialistName(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Add Specialist
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};