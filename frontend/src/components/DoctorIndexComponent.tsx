import React from 'react';

type DoctorIndexComponentProps = {
    data?: Record<string, any>;
};

export const DoctorIndexComponent: React.FC<DoctorIndexComponentProps> = ({ data = {} }) => {
    const { docDAO, totalNumberOfDoctor } = data;

    return (
        <div className="modern-container">
            <div className="modern-card">
                {(!doctorObj ) && (
        
        		<c:redirect url="../doctor_login.jsp"></c:redirect>
        
        	)}
        
        	
        
        
        	<div className="container p-5">
        		<p className="text-center text-success fs-3">Doctor DashBoard</p>
        
        		
        
        		<div className="row">
        			<div className="col-md-4 offset-md-2">
        				<div className="card my-card">
        					<div className="card-body text-center text-success">
        						<i className="fa-solid fa-user-doctor fa-3x"></i><br>
        						<p className="fs-4 text-center">
        							Doctor <br>{totalNumberOfDoctor}
        						</p>
        					</div>
        				</div>
        
        			</div>
        
        			<div className="col-md-4">
        				<div className="card my-card">
        					<div className="card-body text-center text-success">
        						<i className="fa-solid fa-calendar-check fa-3x"></i><br>
        						<p className="fs-4 text-center">
        							Total Appointment <br> {docDAO.countTotalAppointmentByDoctorId(currentLoginDoctor.getId())}
        						</p>
        					</div>
        				</div>
        
        			</div>
        		</div>
        
        
        	</div>
            </div>
        </div>
    );
};

export default DoctorIndexComponent;
