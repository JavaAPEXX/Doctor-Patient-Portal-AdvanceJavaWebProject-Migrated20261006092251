import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/modern-ui.css';
import AdminLoginComponent from './AdminLoginComponent';
import ChangePassword from './src/pages/ChangePassword';
import DoctorLoginComponent from './DoctorLoginComponent';
import IndexComponent from './IndexComponent';
import Signup from './src/pages/Signup';
import user_login from './src/main/webapp/user_login';
import ViewAppointment from './pages/ViewAppointment';
import Doctor from './src/pages/Doctor';
import EditDoctor from './src/components/admin/EditDoctor';
import AdminDashboard from './src/components/AdminDashboard';
import navbar from './src/main/webapp/admin/navbar';
import AdminPatientComponent from './AdminPatientComponent';
import ViewDoctor from './src/pages/admin/ViewDoctor';
import ComponentAllcssComponent from './ComponentAllcssComponent';
import Footer from './Doctor-Patient-Portal/src/main/webapp/component/Footer';
import FooterSimple from './src/components/FooterSimple';
import Navbar from './src/components/Navbar';
import Comment from './src/pages/doctor/Comment';
import EditProfile from './src/pages/doctor/EditProfile';
import DoctorIndexComponent from './DoctorIndexComponent';
import Navbar from './src/components/Navbar';
import DoctorPatientComponent from './DoctorPatientComponent';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="modern-app-root">
        <header className="modern-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2563eb' }}>Modernized Application</span>
          </div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Home</Link>
          </nav>
        </header>
        <main className="modern-main-content">
          <Routes>
        <Route path="/" element={<AdminLoginComponent />} />
        <Route path="/adminlogin" element={<AdminLoginComponent />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/doctorlogin" element={<DoctorLoginComponent />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user_login" element={<user_login />} />
        <Route path="/viewappointment" element={<ViewAppointment />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/editdoctor" element={<EditDoctor />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/navbar" element={<navbar />} />
        <Route path="/adminpatient" element={<AdminPatientComponent />} />
        <Route path="/viewdoctor" element={<ViewDoctor />} />
        <Route path="/allcss" element={<ComponentAllcssComponent />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/footersimple" element={<FooterSimple />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/doctorindex" element={<DoctorIndexComponent />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/doctorpatient" element={<DoctorPatientComponent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
