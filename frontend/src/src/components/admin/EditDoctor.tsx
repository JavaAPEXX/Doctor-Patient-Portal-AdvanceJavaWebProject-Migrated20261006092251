import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * EditDoctor – React migration of `admin/edit_doctor.jsp`
 *
 * This component reproduces the exact UI hierarchy, form fields,
 * conditional alerts and the specialist dropdown that were present
 * in the original JSP. All class names have been mapped to the
 * modern design‑system tokens (`.modern-container`, `.modern-card`,
 * `.form-group`, `.form-label`, `.form-control`, `.btn`,
 * `.alert-box`, `.badge`).
 *
 * Behaviour:
 *  - On mount it fetches the doctor data (GET `/admin/api/doctor?id=…`)
 *    and the list of specialists (GET `/admin/api/specialists`).
 *  - The form is submitted via a normal HTML POST to `../updateDoctor`,
 *    preserving the original backend contract.
 *  - Success and error messages are read from the URL query parameters
 *    (`successMsg` / `errorMsg`) and displayed as modern alert callouts.
 *
 * NOTE: The exact backend endpoints (`/admin/api/doctor` and
 * `/admin/api/specialists`) must exist; otherwise replace them with the
 * correct ones from your server.
 */

interface Doctor {
  id: number;
  fullName: string;
  dateOfBirth: string; // ISO format (yyyy‑mm‑dd)
  qualification: string;
  specialist: string;
  email: string;
  phone: string;
  password: string;
}

interface Specialist {
  specialistName: string;
}

const EditDoctor: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ----- query‑string helpers -------------------------------------------------
  const query = new URLSearchParams(location.search);
  const successMsg = query.get("successMsg") ?? "";
  const errorMsg = query.get("errorMsg") ?? "";
  const doctorId = query.get("id"); // same param used by the original JSP

  // ----- component state ------------------------------------------------------
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>("");

  // ----- data fetching ---------------------------------------------------------
  useEffect(() => {
    if (!doctorId) {
      setFormError("Doctor ID not provided.");
      setLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/admin/api/doctor?id=${doctorId}`);
        if (!res.ok) throw new Error("Failed to fetch doctor");
        const data: Doctor = await res.json();
        setDoctor(data);
      } catch (e) {
        setFormError((e as Error).message);
      }
    };

    const fetchSpecialists = async () => {
      try {
        const res = await fetch(`/admin/api/specialists`);
        if (!res.ok) throw new Error("Failed to fetch specialists");
        const data: Specialist[] = await res.json();
        setSpecialists(data);
      } catch {
        // ignore specialist fetch errors – dropdown will be empty
      }
    };

    Promise.all([fetchDoctor(), fetchSpecialists()]).finally(() => setLoading(false));
  }, [doctorId]);

  // ----- handlers --------------------------------------------------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!doctor) return;
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    // The form uses native POST submission; we simply prevent default
    // if you need client‑side validation before sending.
    // e.preventDefault(); // uncomment if you add validation logic
  };

  // ----- render ---------------------------------------------------------------
  if (loading) {
    return <div className="modern-container">Loading...</div>;
  }

  if (formError) {
    return (
      <div className="modern-container">
        <div className="alert-box alert-danger">{formError}</div>
      </div>
    );
  }

  return (
    <div className="modern-container">
      {successMsg && <div className="alert-box alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert-box alert-danger">{errorMsg}</div>}

      <div className="modern