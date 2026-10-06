import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  // Form state corresponding ONLY to the detected inputs: fullName, email, password
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // State for messages (simulating session attributes from JSP)
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real migration, this would call the backend API or submit the form
    // Since backend mode is unchanged and we are only generating frontend,
    // we simulate the submission behavior.
    console.log('Submitting registration:', formData);
    
    // Reset form after submission (optional, depending on desired UX)
    // setFormData({ fullName: '', email: '', password: '' });
  };

  return (
    <div className="modern-container">
      <div className="modern-card">
        <div className="card-header text-center text-white my-bg-color">
          <p className="fs-4 text-center text-white mt-2">
            <i className="fa fa-user-plus"></i> User Register
          </p>
        </div>
        <div className="card-body">
          {/* Success Message Alert */}
          {successMsg && (
            <div className="alert-box alert-success text-center">
              {successMsg}
            </div>
          )}

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="alert-box alert-danger text-center">
              {errorMsg}
            </div>
          )}

          {/* Registration Form */}
          <form action="user_register" method="post" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter full name"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary my-bg-color text-white col-md-12 w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;