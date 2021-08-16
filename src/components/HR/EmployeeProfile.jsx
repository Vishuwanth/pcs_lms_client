import React, { useState, useEffect } from 'react'
import './EmployeeProfile.css'
import FemaleImg from '../Images/female.jpg'
import axios from 'axios'
import { format, differenceInDays } from 'date-fns'
import {
	CTable,
	CTableHead,
	CTableRow,
	CTableHeaderCell,
	CTableBody,
	CTableDataCell,
	CTableCaption,
	CPagination,
	CPaginationItem,
	CSpinner,
	CButton,
} from '@coreui/react'
import { Link } from 'react-router-dom'

function EmployeeProfile(props) {
	// console.log(props.handleEmpProfile)
	const [leaveData, setLeaveData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	const emp = props.emp
	const isMale = emp.Gender
	const maleImg = 'https://bootdey.com/img/Content/avatar/avatar7.png'

	useEffect(() => {
		renderLeaveHistory()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const renderLeaveHistory = async () => {
		const url = 'https://pcs-lms.herokuapp.com/leave-application-emp/' + emp._id
		await axios
			.get(url, {
				headers: {
					authorization: localStorage.getItem('token') || '',
				},
			})
			.then((res) => {
				const data = res.data.leaveApplication
				// console.log(data)

				const formattedData = data.map((each, index) => {
					var status
					if (each.Status === '1') {
						status = 'Pending'
					} else if (each.Status === '2') {
						status = 'Approved'
					} else if (each.Status === '3') {
						status = 'Rejected'
					}

					return {
						Id: index + 1,
						From: format(new Date(each.FromDate), 'MM/dd/yy'),
						To: format(new Date(each.ToDate), 'MM/dd/yy'),
						Days: differenceInDays(
							new Date(each.ToDate),
							new Date(each.FromDate)
						),
						Reason: each.Reasonforleave,
						LeaveType: each.Leavetype,
						Status: status,
					}
				})

				setLeaveData(formattedData)
				setIsLoading(false)
			})
	}
	console.log('leave', leaveData)
	// console.log(Object.keys(leaveData[0]))

	return (
		<div>
			<ol className='breadcrumb'>
				<Link to='/hr' className='breadcrumb-item'>
					Home
				</Link>
				<li className='breadcrumb-item'>all-Employees</li>
				<li className='breadcrumb-item active' aria-current='page'>
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
						{/* <div className='row gutters-sm '>
							<div className='col-12 mb-3'>
								{leaveData.map((each) => (
									<h1>{format(new Date(each.fromDate), 'dd/MM/yyyy')}</h1>
								))}
							</div>
						</div> */}
					</div>

					<div className='col-12 mb-3'>
						{isLoading ? (
							<div className='loading-colors'>
								<CSpinner color='primary' variant='grow' />
								<CSpinner color='secondary' variant='grow' />
								<CSpinner color='success' variant='grow' />
								<CSpinner color='danger' variant='grow' />
								<CSpinner color='warning' variant='grow' />
								<CSpinner color='info' variant='grow' />
								<CSpinner color='light' variant='grow' />
								<CSpinner color='dark' variant='grow' />
							</div>
						) : (
							<div className='leave-history-table'>
								<CTable caption='top' responsive>
									<CTableCaption>
										<strong>
											{emp.FirstName} {emp.LastName} Leave History
										</strong>
									</CTableCaption>
									<CTableHead>
										<CTableRow>
											{Object.keys(leaveData[0]).map((each) => (
												<CTableHeaderCell scope='col'>{each}</CTableHeaderCell>
											))}
										</CTableRow>
									</CTableHead>
									<CTableBody>
										{leaveData.map((each) => (
											<CTableRow>
												<CTableDataCell>{each.Id}</CTableDataCell>
												<CTableDataCell>{each.From}</CTableDataCell>
												<CTableDataCell>{each.To}</CTableDataCell>
												<CTableDataCell>{each.Days}</CTableDataCell>
												<CTableDataCell>{each.Reason}</CTableDataCell>
												<CTableDataCell>{each.LeaveType}</CTableDataCell>
												<CTableDataCell>
													{each.Status === 'Pending' ? (
														<CButton color='warning'>{each.Status}</CButton>
													) : each.Status === 'Approved' ? (
														<CButton color='success'>{each.Status}</CButton>
													) : (
														<CButton color='danger'>{each.Status}</CButton>
													)}
												</CTableDataCell>
											</CTableRow>
										))}
									</CTableBody>
								</CTable>
								<CPagination
									className='justify-content-center'
									aria-label='Page navigation example'>
									<CPaginationItem>Previous</CPaginationItem>
									<CPaginationItem>1</CPaginationItem>
									<CPaginationItem>2</CPaginationItem>
									<CPaginationItem>3</CPaginationItem>
									<CPaginationItem>Next</CPaginationItem>
								</CPagination>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmployeeProfile
