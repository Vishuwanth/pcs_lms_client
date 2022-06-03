import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid/dist/styles/theme-blue.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Holidays.css";
// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

function Holidays() {
  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setcolumnDefs] = useState([
    {
      headerName: "SNo",
      field: "SNo",
      sortable: false,
    },
    {
      headerName: "Year 2022",
      field: "Year 2022",
      sortable: false,
    },
    {
      headerName: "Holiday",
      field: "Holiday",
      sortable: false,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 350,
    filter: "agTextColumnFilter",
    // filter: true ,
  });

  var rowData = [
    {
      SNo: "1",
      "Year 2022": "Friday January 22, 2022",
      Holiday: "MakarSankranthi",
    },
    {
      SNo: "2",
      "Year 2022": "Wednesday, January 26, 2022",
      Holiday: "Republic Day",
    },
    {
      SNo: "3",
      "Year 2022": "Friday, March 18, 2022",
      Holiday: "Holi / Dol Jatra",
    },
    {
      SNo: "4",
      "Year 2022": "Friday, April 15, 2022",
      Holiday: "Good Friday",
    },
    {
      SNo: "5",
      "Year 2022": "Monday, August 15, 2022",
      Holiday: "Independence Day",
    },
    {
      SNo: "6",
      "Year 2022": "Friday, August 19, 2022",
      Holiday: "Sri Krishna Janmashtami",
    },
    {
      SNo: "7",
      "Year 2022": "Wednesday, August 31, 2022",
      Holiday: "Ganesh Chaturthi",
    },
    {
      SNo: "8",
      "Year 2022": "Wednesday, October 5, 2022 ",
      Holiday: "Dusshera",
    },
    {
      SNo: "9",
      "Year 2022": "Monday, October 24, 2022 ",
      Holiday: "Diwali",
    },
    {
      SNo: "10",
      "Year 2022": "Tuesday, October 25, 2022 ",
      Holiday: "Diwali",
    },
  ];

  return (
    <div>
      <CBreadcrumb style={{ "--cui-breadcrumb-divider": "'';" }}>
        <CBreadcrumbItem>
          <Link to="/">Home</Link>
        </CBreadcrumbItem>
        <CBreadcrumbItem active>Holidays</CBreadcrumbItem>
      </CBreadcrumb>
      <p className="holiday">Holidays List of Year 2022</p>
      <div
        id="table-div"
        className="ag-blue "
        style={{
          height: "300px",
          width: "100%",
          padding: "10px",
          borderRadius: "50px",
        }}
      >
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
  );
}

export default Holidays;
