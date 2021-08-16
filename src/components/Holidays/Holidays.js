import React from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid/dist/styles/theme-blue.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Holidays.css'
// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

function Holidays() {
	// eslint-disable-next-line no-unused-vars
	const [columnDefs, setcolumnDefs] = useState([
		{
			headerName: 'SNo',
			field: 'SNo',
			sortable: false,
		},
		{
			headerName: 'Year 2021',
			field: 'Year 2021',
			sortable: false,
		},
		{
			headerName: 'Holiday',
			field: 'Holiday',
			sortable: false,
		},
	])

	// eslint-disable-next-line no-unused-vars
	const [defaultColDef, setdefaultColDef] = useState({
		resizable: true,
		width: 350,
		filter: 'agTextColumnFilter',
		// filter: true ,
	})

	var rowData = [
		{
			SNo: '1',
			'Year 2021': 'Friday January 1, 2021',
			Holiday: 'New Year',
		},
		{
			SNo: '2',
			'Year 2021': 'Tuesday, January 26, 2021',
			Holiday: 'Republic Day',
		},
		{
			SNo: '3',
			'Year 2021': 'Monday, March 29, 2021',
			Holiday: 'Holi',
		},
		{
			SNo: '4',
			'Year 2021': 'Tuesday, April 13, 2021',
			Holiday: 'Gudi Padwa',
		},
		{
			SNo: '5',
			'Year 2021': 'Wednesday, April 21, 2021',
			Holiday: 'Ram Navami',
		},
		{
			SNo: '6',
			'Year 2021': 'Friday, May 14, 2021',
			Holiday: 'Ramzan Id',
		},
		{
			SNo: '7',
			'Year 2021': 'Friday, September 10, 2021',
			Holiday: 'Ganesh Chaturthi',
		},
		{
			SNo: '8',
			'Year 2021': 'Friday, October 15, 2021 ',
			Holiday: 'Dusshera',
		},
		{
			SNo: '9',
			'Year 2021': 'Tuesday, October 19, 2021 ',
			Holiday: 'Id e Milad',
		},
		{
			SNo: '10',
			'Year 2021': 'Thursday, November 4, 2021 ',
			Holiday: 'Diwali',
		},
	]

	return (
		<div>
			<CBreadcrumb style={{ '--cui-breadcrumb-divider': "'';" }}>
				<CBreadcrumbItem>
					<Link to='/'>Home</Link>
				</CBreadcrumbItem>
				<CBreadcrumbItem active>Holidays</CBreadcrumbItem>
			</CBreadcrumb>
			<p className='holiday'>Holidays List of Year 2021</p>
			<div
				id='table-div'
				className='ag-blue '
				style={{
					height: '300px',
					width: '100%',
					padding: '10px',
					borderRadius: '50px',
				}}>
				<AgGridReact
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					// columnTypes={columnTypes}
					rowData={rowData}
					pagination={false}
					paginationPageSize={20}
					// getRowHeight={getRowHeight}
				/>
			</div>
		</div>
	)
}

export default Holidays
