import React from 'react'
import './EmployeeProfile.css'
import FemaleImg from '../Images/female.jpg'

function EmployeeProfile(props) {
	// console.log(props.handleEmpProfile)
	const emp = props.emp
	const isMale = emp.Gender
	const maleImg = 'https://bootdey.com/img/Content/avatar/avatar7.png'

	return (
		<div>
			<ol class='breadcrumb'>
				<li class='breadcrumb-item'>Home</li>
				<li class='breadcrumb-item'>all-Employees</li>
				<li class='breadcrumb-item active' aria-current='page'>
					User Profile
				</li>
			</ol>
			<div className='main-body'>
				<div className='row gutters-sm'>
					<div className='col-md-5 mb-3'>
						<div className='card'>
							<div className='card-body'>
								<div className='d-flex flex-column align-items-center text-center'>
									<img
										src={isMale === 'Male' ? maleImg : FemaleImg}
										alt='Admin'
										className='rounded-circle'
										width='150'
									/>
									<div className='mt-3'>
										<h4>
											{emp.FirstName} {emp.LastName}
										</h4>
										<p className='text-secondary mb-1'>Role : </p>
										<p className='text-muted font-size-sm'>Address</p>
										<p className='text-muted font-size-sm'>{emp.Email}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-7'>
						<div className='card mb-3'>
							<div className='card-body'>
								{/* <div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Full Name</h6>
									</div>
									<div className='col-sm-9 text-secondary'>
										{emp.FirstName} {emp.LastName}
									</div>
								</div>
								<hr /> */}
								{/* <div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Email</h6>
									</div>
									<div className='col-sm-9 text-secondary'>{emp.Email}</div>
								</div>
								<hr /> */}
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Id</h6>
									</div>
									<div className='col-sm-9 text-secondary'>{emp._id}</div>
								</div>
								<hr />
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Phone</h6>
									</div>
									<div className='col-sm-9 text-secondary'>{emp.ContactNo}</div>
								</div>
								<hr />
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Leave Balance</h6>
									</div>
									<div className='col-sm-9 text-secondary'>
										{emp.leaveBalance}
									</div>
								</div>
								<hr />
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Leaves Applied</h6>
									</div>
									<div className='col-sm-9 text-secondary'>
										{emp.leaveApplication.length}
									</div>
								</div>
								<hr />
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Address</h6>
									</div>
									<div className='col-sm-9 text-secondary'>-</div>
								</div>
								<hr />
								<div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>DOB</h6>
									</div>
									<div className='col-sm-9 text-secondary'>
										{emp.DOB.slice(0, 10)}
									</div>
								</div>
								<hr />
								<div className='row m-auto '>
									<div className='col-6 d-flex justify-content-end'>
										<button className='btn btn-info '>Edit</button>
									</div>
									<div className='col-6'>
										<button
											className='btn btn-info'
											onClick={props.handleCancelButton}>
											Back
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* <div className='row back-button'>
							<div className='col-sm-12'>
								<button
									className='btn btn-info'
									onClick={props.handleCancelButton}>
									Back
								</button>
							</div>
						</div> */}
						<div className='row gutters-sm '>
							<div className='col-sm-6 mb-3'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmployeeProfile
