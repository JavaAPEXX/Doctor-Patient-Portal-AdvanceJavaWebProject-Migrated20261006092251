import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface Doctor {
  id: number;
  fullName: string;
  dateOfBirth: string;
  qualification: string;
  specialist: string;
  email: string;
  phone: string;
}

interface Specialist {
  id: number;
  specialistName: string;
}

interface Messages {
  successMsg?: string;
  errorMsg?: string;
  successMsgForD?: string;
  errorMsgForD?: string;
}

// Mock API functions to simulate backend interaction
// In a real scenario, these would be replaced by actual API calls
const fetchDoctorProfile = async (): Promise<Doctor> => {
  // Simulate fetching from backend
  return {
    id: 1,
    fullName: "Dr. John Doe",
    dateOfBirth: "1980-01-01",
    qualification: "MD, PhD",
    specialist: "Cardiology",
    email: "john.doe@example.com",
    phone: "1234567890"
  };
};

const fetchSpecialists = async (): Promise<Specialist[]> => {
  // Simulate fetching specialists from backend
  return [
    { id: 1, specialistName: "Cardiology" },
    { id: 2, specialistName: "Neurology" },
    { id: 3, specialistName: "Pediatrics" },
    { id: 4, specialistName: "Orthopedics" }
  ];
};

const changePassword = async (data: { newPassword: string; oldPassword: string; doctorId: number }) => {
  // Simulate API call
  console.log("Changing password", data);
  return { success: true, message: "Password changed successfully" };
};

const updateProfile = async (data: {
  fullName: string;
  dateOfBirth: string;
  qualification: string;
  specialist: string;
  email: string;
  phone: string;
  doctorId: number;
}) => {
  // Simulate API call
  console.log("Updating profile", data);
  return { success: true, message: "Profile updated successfully" };
};

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  
  // State for doctor profile
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  
  // State for messages
  const [messages, setMessages] = useState<Messages>({});
  
  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    oldPassword: ''
  });
  
  // State for profile form
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    dateOfBirth: '',
    qualification: '',
    specialist: '',
    email: '',
    phone: ''
  });

  // Loading states
  const [loading, setLoading] = useState(true);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [submittingProfile, setSubmittingProfile] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [doctorData, specialistData] = await Promise.all([
          fetchDoctorProfile(),
          fetchSpecialists()
        ]);
        
        setDoctor(doctorData);
        setSpecialists(specialistData);
        
        // Initialize profile form with doctor data
        setProfileForm({
          fullName: doctorData.fullName,
          dateOfBirth: doctorData.dateOfBirth,
          qualification: doctorData.qualification,
          specialist: doctorData.specialist,
          email: doctorData.email,
          phone: doctorData.phone
        });
      } catch (error) {
        console.error("Error loading data:", error);
        // Redirect to login if doctor is not authenticated
        navigate('/doctor-login');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;
    
    setSubmittingProfile(true);
    setMessages({});
    
    try {
      const response = await updateProfile({
        ...profileForm,
        doctorId: doctor.id
      });
      
      if (response.success) {
        setMessages({ successMsg: response.message });
      } else {
        setMessages({ errorMsg: response.message });
      }
    } catch (error) {
      setMessages({ errorMsg: "Failed to update profile" });
    } finally {
      setSubmittingProfile(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) return;
    
    setSubmittingPassword(true);
    setMessages({});
    
    try {
      const response = await changePassword({
        ...passwordForm,
        doctorId: doctor.id
      });
      
      if (response.success) {
        setMessages({ successMsgForD: response.message });
        setPasswordForm({ newPassword: '', oldPassword: '' });
      } else {
        setMessages({ errorMsgForD: response.message });
      }
    } catch (error) {
      setMessages({ errorMsgForD: "Failed to change password" });
    } finally {
      setSubmittingPassword(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return null;
  }

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      
      {messages.successMsg && (
        <div className="alert alert-success">{messages.successMsg}</div>
      )}
      {messages.errorMsg && (
        <div className="alert alert-danger">{messages.errorMsg}</div>
      )}
      {messages.successMsgForD && (
        <div className="alert alert-success">{messages.successMsgForD}</div>
      )}
      {messages.errorMsgForD && (
        <div className="alert alert-danger">{messages.errorMsgForD}</div>
      )}

      <div className="profile-section">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmitProfile}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileForm.fullName}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={profileForm.dateOfBirth}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={profileForm.qualification}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialist">Specialist</label>
            <select
              id="specialist"
              name="specialist"
              value={profileForm.specialist}
              onChange={handleProfileChange}
              required
            >
              <option value="">Select Specialist</option>
              {specialists.map(spec => (
                <option key={spec.id} value={spec.specialistName}>
                  {spec.specialistName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <button type="submit" disabled={submittingProfile}>
            {submittingProfile ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="password-section">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <button type="submit" disabled={submittingPassword}>
            {submittingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;