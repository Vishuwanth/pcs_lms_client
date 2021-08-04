import React, { Component, useState, useEffect } from 'react'
import './LeaveApplicationEmp.css'
import axios from 'axios'
import LeaveApplicationEmpTable from './LeaveApplicationEmpTable.jsx'
import LeaveApplicationEmpForm from './LeaveApplicationEmpForm.jsx'
import LeaveApplicationEmpFormEdit from './LeaveApplicationEmpFormEdit.jsx'
import { format, isToday, compareDesc, differenceInDays } from 'date-fns'

import { tr } from 'react-dom-factories'

function LeaveApplicationEmp(props) {
	// console.log("LeaveApplicationEmp", props)
	// console.log("props data", props.data)
	// console.log("props data id", props.data["_id"])

	const [table, setTable] = useState(true)
	const [editForm, setEditForm] = useState(false)
	const [editData, setEditData] = useState({})
	const [leaveBalance, setLeaveBalance] = useState(
		localStorage.getItem('leaveBalance')
	)

	useEffect(() => {
		axios
			.get(
				'https://pcs-lms.herokuapp.com/leave-application-emp/' +
					props.data['_id'] +
					'/leave-balance',
				{
					headers: {
						authorization: localStorage.getItem('token') || '',
					},
				}
			)
			.then((res) => {
				// console.log("Leave balance")
				// console.log("res",res.data.leaveBalance)
				localStorage.setItem('leaveBalance', res.data.leaveBalance)
			})
			.catch((err) => {
				console.log('err', err)
			})
	}, [props.data])

	// updating leave balance in server
	const updateLeaveBalance = (leaveBalance, noOfDays) => {
		// console.log("updated balance called",props.data["_id"])
		leaveBalance = leaveBalance - noOfDays
		let updatedLeaveBalance = {
			leaveBalance: leaveBalance,
		}
		let url =
			'https://pcs-lms.herokuapp.com/leave-application-emp/' +
			props.data['_id'] +
			'/leave-balance/'
		axios
			.put(url, updatedLeaveBalance, {
				headers: {
					authorization: localStorage.getItem('token') || '',
				},
			})
			.then((res) => {
				localStorage.setItem('leaveBalance', res.data.leaveBalance)
				console.log('updated lb', res.data)
			})
	}

	const handleLeaveApplicationEmpSubmit = (event) => {
		event.preventDefault()
		// console.log("id", event.target[0].value, event.target[1].value);
		// this.setState({ table: true });

		// var leaveBalance = localStorage.getItem('leaveBalance')
		if (localStorage.getItem('leaveBalance') == 0) {
			return window.alert('Your Leave Balance is zero, contact HR')
		}
		// setTable(true)

		var fromDateFNS = new Date(event.target[2].value)
		var toDateFNS = new Date(event.target[3].value)

		const result = compareDesc(
			new Date(event.target[2].value),
			new Date(event.target[3].value)
		)
		console.log('result', result) // if result = -1 then fromDate is bigger than toDate
		console.log('date', isToday(fromDateFNS))

		if (result === 1) {
			let todaysDate = new Date()
			console.log('Todays Date', todaysDate)
			// console.log("compared",compareDesc(todaysDate,fromDateFNS))
			// if(compareDesc(todaysDate,fromDateFNS)==-1 || compareDesc(todaysDate,fromDateFNS)==0){
			//   console.log("Leave Applied")
			// }else{
			//   console.log("Everything is not fine")
			// }

			if (fromDateFNS.getUTCFullYear() >= todaysDate.getUTCFullYear()) {
				if (fromDateFNS.getMonth() >= todaysDate.getMonth()) {
					if (fromDateFNS.getUTCDate() >= todaysDate.getUTCDate()) {
						let body = {
							Name: event.target[0].value,
							Leavetype: event.target[1].value,
							FromDate: event.target[2].value,
							ToDate: event.target[3].value,
							Reasonforleave: event.target[4].value,
							Status: event.target[5].value,
						}
						axios
							.post(
								'https://pcs-lms.herokuapp.com/leave-application-emp/' +
									props.data['_id'],
								body,
								{
									headers: {
										authorization: localStorage.getItem('token') || '',
									},
								}
							)
							.then((res) => {
								// this.setState({ table: false });
								// this.setState({ table: true });
								const noOfDays = differenceInDays(
									new Date(body.ToDate),
									new Date(body.FromDate)
								)
								console.log('clint-side-days', noOfDays)
								setTable(false)
								setTable(true)

								// console.log("update function before calling",props.data["_id"])
								updateLeaveBalance(
									localStorage.getItem('leaveBalance'),
									noOfDays
								)
							})
							.catch((err) => {
								// console.log(err);
							})
					} else {
						window.alert('Please enter valid FROM DATE')
						// setTable(false)
					}
				} else {
					window.alert('Leave Not Applied')
					// setTable(false)
				}
			} else {
				window.alert('Leave Not Applied')
				// setTable(false)
			}
		} else {
			window.alert("From Date should be not be less the Today's Date")
			// setTable(false)
		}
		setTable(false)
	}
	const handleAddLeaveApplicationEmp = () => {
		// console.log("clicked1");
		// this.setState({ table: false });
		setTable(false)
	}
	const handleEditLeaveApplicationEmp = (e) => {
		// console.log(e);
		// console.log("clicked6");
		setEditForm(true)
		setEditData(e)
	}
	const handleFormClose = () => {
		// console.log("clicked1");
		setTable(true)
	}
	const handleEditFormClose = () => {
		// console.log("clicked5");
		setEditForm(false)
	}

	const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
		newInfo.preventDefault()
		// console.log(newInfo.target[0].value)
		// console.log(newInfo.target[1].value)
		// console.log(newInfo.target[2].value)
		// console.log(newInfo.target[3].value)
		// console.log(newInfo.target[4].value)
		// console.log(newInfo.target[5].value)
		// console.log("zero data", newInfo.target[0].value);
		let body = {
			Leavetype: newInfo.target[0].value,
			FromDate: newInfo.target[1].value,
			ToDate: newInfo.target[2].value,
			Reasonforleave: newInfo.target[3].value,
			Status: newInfo.target[4].value,
		}
		console.log('update', body)
		axios
			.put(
				'https://pcs-lms.herokuapp.com/leave-application-emp/' + info['_id'],
				body,
				{
					headers: {
						authorization: localStorage.getItem('token') || '',
					},
				}
			)
			.then((res) => {
				setTable(false)
				setTable(true)
			})
			.catch((err) => {
				console.log(err)
			})
		setEditForm(false)
	}

	return (
		<React.Fragment>
			{table ? (
				editForm ? (
					<LeaveApplicationEmpFormEdit
						onLeaveApplicationEmpEditUpdate={
							handleLeaveApplicationEmpEditUpdate
						}
						onFormEditClose={handleEditFormClose}
						editData={editData}
					/>
				) : (
					<LeaveApplicationEmpTable
						onAddLeaveApplicationEmp={handleAddLeaveApplicationEmp}
						onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
						data={props.data}
					/>
				)
			) : (
				<LeaveApplicationEmpForm
					onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
					onFormClose={handleFormClose}
					// onGenderChange={handleAddFormGenderChange}
				/>
			)}
		</React.Fragment>
	)
}

export default LeaveApplicationEmp
