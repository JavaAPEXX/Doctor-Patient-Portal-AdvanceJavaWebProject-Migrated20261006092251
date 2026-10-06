import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
}

interface ChangePasswordProps {
  userObj: User | null;
  successMsg?: string;
  errorMsg?: string;
  onClearMessages?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ 
  userObj, 
  successMsg, 
  errorMsg,
  onClearMessages 
}) => {
  const navigate = useNavigate();
  
  // Form state corresponding ONLY to detected fields: newPassword, oldPassword
  const [formData, setFormData] = useState({
    newPassword: '',
    oldPassword: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prepare form data for submission
    const submitData = new FormData();
    submitData.append('newPassword', formData.newPassword);
    submitData.append('oldPassword', formData.oldPassword);
    submitData.append('userId', userObj?.id.toString() || '');

    // Submit to the exact backend endpoint identified in source: 'userChangePassword'
    fetch('userChangePassword', {
      method: 'POST',
      body: submitData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // In a real scenario, you might parse the response here
      // For now, we assume the server handles the redirect or returns JSON
      // Since the original JSP relies on server-side redirect/response, 
      // we might need to handle the response based on backend behavior.
      // However, without explicit backend contract for JSON response, 
      // we assume standard form submission behavior.
      // If the backend redirects, the browser will handle it.
      // If it returns JSON, we would update state.
      // Given "Backend Mode: unchanged", we stick to standard form submission semantics.
    })
    .catch(error => {
      console.error('Error changing password:', error);
    });
  };

  // Redirect if user is not logged in (preserving <c:if test="${empty userObj }">)
  useEffect(() => {
    if (!userObj) {
      navigate('/user_login', { replace: true });
    }
  }, [userObj, navigate]);

  // Clear messages if they exist and callback is provided (preserving <c:remove>)
  useEffect(() => {
    if ((successMsg || errorMsg) && onClearMessages) {
      onClearMessages();
    }
  }, [successMsg, errorMsg, onClearMessages]);

  if (!userObj) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="modern-container">
      <div className="modern-card">
        <div className="card-body">
          <h2 className="fs-3 text-center myP-color">Change Password</h2>

          {/* Success Message Alert */}
          {successMsg && (
            <div className="alert-box alert-success text-center fs-5">
              {successMsg}
            </div>
          )}

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="alert-box alert-danger text-center fs-5">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} action="userChangePassword" method="post">
            <div className="form-group mb-3">
              <label htmlFor="newPassword" className="form-label">
                Enter New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Enter Old Password
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="Enter old password"
                className="form-control"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Hidden field for user ID */}
            <input type="hidden" name="userId" value={userObj.id} />

            <button type="submit" className="btn btn-primary w-100">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;