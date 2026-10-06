import React from 'react';

type AdminPatientComponentProps = {
    data?: Record<string, any>;
};

export const AdminPatientComponent: React.FC<AdminPatientComponentProps> = ({ data = {} }) => {
    const { appList, doctor } = data;

    return (
        <div className="modern-container">
            <div className="modern-card">
                <div className="col-md-12 p-5">
        		<div className="card my-card">
        			<div className="card-body">
        				<p className="text-center text-danger fs-3">Patient Details</p>
        
        				<div className="modern-table-wrapper"><table className="modern-table table table-hover" className="table table-success table-striped">
        					<thead>
        						<tr className="table">
        							<th scope="col" style="padding-right:70px">Full Name</th>
        							<th scope="col">Gender</th>
        							<th scope="col">Age</th>
        							<th scope="col">Appointment</th>
        							<th scope="col">Email</th>
        							<th scope="col">Phone</th>
        							<th scope="col" style="padding-right:50px">Diseases</th>
        							<th scope="col" style="padding-right:70px">Doctor Name</th>
        							<th scope="col">Address</th>
        							<th scope="col" style="padding-right:100px">Status</th>
        
        						</tr>
        					</thead>
        					<tbody>
        
        						
        						<tr>
        							<th>{appList.fullName}</th>
        							<td>{appList.gender}</td>
        							<td>{appList.age}</td>
        							
        							<td>{appList.appointmentDate}</td>
        							<td>{appList.email}</td>
        							<td>{appList.phone}</td>
        							<td>{appList.diseases}</td>
        							<td>{doctor.fullName}</td>
        							<td>{appList.address}</td>
        							<td>{appList.status}</td>
        
        						</tr>
        						
        						
        ))}
        
        						
        					</tbody>
        
        				</table></div>
        
        			</div>
        
        
        		</div>
        
        	</div>
            </div>
        </div>
    );
};

export default AdminPatientComponent;
