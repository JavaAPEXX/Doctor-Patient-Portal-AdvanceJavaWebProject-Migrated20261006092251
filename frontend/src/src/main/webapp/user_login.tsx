import React, { useState } from 'react';
import './user_login.css';

interface UserLoginProps {
  // No props required
}

const UserLogin: React.FC<UserLoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Backend call to process form data
    // For demonstration purposes, assume the backend returns a success message
    setSuccessMsg('Login successful!');
    setErrorMsg('');
  };

  return (
    <div className="user-login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control"
            value={email}
            onChange={(event) = /> setEmail(event.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(event) = /> setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn col-md-12 text-white my-bg-color">
          Submit
        </button>
      </form>
      {successMsg && (
        <div className="alert alert-success">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="alert alert-danger">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default UserLogin;
.user-login {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-text {
  font-size: 12px;
  color: #666;
}

.alert {
  margin-bottom: 10px;
}

.alert-success {
  background-color: #f0f0f0;
  color: #3c763d;
}

.alert-danger {
  background-color: #f0f0f0;
  color: #f44336;
}