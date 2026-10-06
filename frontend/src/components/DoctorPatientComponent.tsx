import React from 'react';

type DoctorPatientComponentProps = {
    data?: Record<string, any>;
};

export const DoctorPatientComponent: React.FC<DoctorPatientComponentProps> = ({ data = {} }) => {
    const { applist, errorMsg, successMsg } = data;

    return (
        <div className="modern-container">
            <div className="modern-card">
                {(!doctorObj ) && (
        
        		<c:redirect url="../doctor_login.jsp"></c:redirect>
        
        	)}
        
        	
        
        
        	<div className="container p-3">
        		<div className="row">
        			<div className="col-md-12">
        				<div className="card my-card">
        					<div className="card-body">
        						<p className="text-center text-success fs-3">Patient Details</p>
        
        						
        						
        						{(Boolean(successMsg )) && (
        							<p className="text-center text-success fs-5">{successMsg}</p>
        							<c:remove var="successMsg" scope="session" />
        						)}
        
        						
        						{(Boolean(errorMsg )) && (
        							<p className="text-center text-danger fs-5">{errorMsg}</p>
        							<c:remove var="errorMsg" scope="session" />
        						)}
        						
        
        						
        
        						<div className="modern-table-wrapper"><table className="modern-table table table-hover" className="table table-striped">
        							<thead>
        								<tr>
        									<th scope="col" style="padding-right: 100px">Full Name</th>
        									<th scope="col">Gender</th>
        									<th scope="col">Age</th>
        									<th scope="col">Appointment Date</th>
        									<th scope="col">Email</th>
        									<th scope="col">Phone</th>
        									<th scope="col">Diseases</th>
        									<th scope="col">Status</th>
        									<th scope="col">Action</th>
        								</tr>
        							</thead>
        							<tbody>
        
        
        								<tr>
        									<th>{applist.fullName}</th>
        									<td>{applist.gender}</td>
        									<td>{applist.age}</td>
        									<td>{applist.appointmentDate}</td>
        									<td>{applist.email}</td>
        									<td>{applist.phone}</td>
        									<td>{applist.diseases}</td>
        									<td>{applist.status}</td>
        
        									<td>
        										 <a href="comment.jsp?id={applist.id}"
        										className="btn btn-success btn-sm">Comment / Prescription</a> 
        										 
         										 <a href="#!" className="btn btn-success btn-sm disabled"><i className="fa fa-comment"></i> Comment / Prescription</a>
        											 
        ))}
        
        
        									</td>
        									
        								</tr>
        
        
        
        ))}
        
        
        							</tbody>
        						</table></div>
        
        						
        
        
        
        					</div>
        				</div>
        			</div>
        
        		</div>
        
        	</div>
            </div>
        </div>
    );
};

export default DoctorPatientComponent;
