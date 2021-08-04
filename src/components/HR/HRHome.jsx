import React, { useState, useEffect } from 'react'
import { format, differenceInDays } from 'date-fns'
import './HRHome.css'
import axios from 'axios'

export const HRHome = (props) => {
	var [date, setDate] = useState(new Date())
	var [leaveData, setLeaveData] = useState([])
	var [onAccept, setonAccept] = useState()

	useEffect(() => {
		loadPendingLeaveRequests()
		console.log('adfasdfadf', leaveData)
		// var timer = setInterval(() => setDate(new Date()), 1000)
		// return function cleanup() {
		// 	clearInterval(timer)
		// }
	}, [setLeaveData])

	const loadPendingLeaveRequests = async () => {
		await axios
			.get('https://pcs-lms.herokuapp.com/leave-application-hr/', {
				headers: {
					authorization: localStorage.getItem('token') || '',
				},
			})
			.then((response) => {
				setLeaveData(response.data)
			})
	}

	const approveOrReject = (onAccept, _id) => {
		var Status
		if (onAccept) {
			Status = '2'
		} else {
			Status = '3'
		}

		let body = {
			Status: Status,
		}
		console.log('Body', body)
		//leave id
		console.log('id', _id)
		axios
			.put('https://pcs-lms.herokuapp.com/leave-application-hr/' + _id, body, {
				headers: {
					authorization: localStorage.getItem('token') || '',
				},
			})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div id='home'>
			<div className='time-card'>
				<p className='date'> Date : {date.toLocaleDateString()}</p>
				<p className='time'> Time : {date.toLocaleTimeString()}</p>
			</div>
			{leaveData ? (
				<>
					<h1 className='pending-leaves-heading'>Pending Leave Requests :</h1>
					{leaveData.map((user, id) => {
						const fromDate = format(new Date(user.FromDate), 'dd/MM/yyyy')
						const toDate = format(new Date(user.ToDate), 'dd/MM/yyyy')
						const diff = differenceInDays(
							new Date(user.ToDate),
							new Date(user.FromDate)
						)
						console.log(diff)
						if (user.Status == 1) {
							return (
								<div className='emp-card' key={id}>
									<div className='leave-content'>
										<p>
											<strong>Employee</strong> : {user.EmployeeName}
										</p>
										<p>
											<strong>Reason</strong> :{user.Reasonforleave}
										</p>
										<div className='dates'>
											<p>
												<strong>Date</strong> :{fromDate}
												<strong> - </strong> {toDate}
											</p>
										</div>
										<p>
											<strong>Days</strong> :{diff}
										</p>
									</div>
									<div className='accept-reject-buttons'>
										<button
											className='accept'
											onClick={() => approveOrReject(true, user._id)}>
											<i class='fas fa-user-check'></i>
											Approve
										</button>
										<button
											className='reject'
											onClick={() => approveOrReject(false, user._id)}>
											<i class='fas fa-user-times'></i>
											Reject
										</button>
									</div>
								</div>
							)
						}
					})}
				</>
			) : (
				' '
			)}
		</div>
	)
}

export default HRHome
