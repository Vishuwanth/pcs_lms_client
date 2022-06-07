/* eslint-disable array-callback-return */
import React from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid/dist/styles/theme-blue.css";

import { useState } from "react";
import { useEffect } from "react";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_lms_url;

const red = css`
  background-color: red;
`;

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function LeaveApplicationHRTable(props) {
  // eslint-disable-next-line no-unused-vars
  const [leaveApplicationHRData, setleaveApplicationHRData] = useState([]);
  const [loading, setloading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setcolumnDefs] = useState([
    {
      headerName: "Employee Name",
      field: "EmployeeName",
      sortable: true,
    },
    {
      headerName: "Leave type",
      field: "Leavetype",
      sortable: true,
    },

    {
      headerName: "From Date",
      field: "FromDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "To Date",
      field: "ToDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Reason For Leave",
      field: "Reasonforleave",
      sortable: true,
    },
    {
      headerName: "Status",
      field: "Status",
      sortable: true,
    },
    {
      headerName: "",
      field: "edit",
      filter: false,
      width: 30,
      cellRendererFramework: renderEditButton.bind(this),
    },
    {
      headerName: "",
      field: "delete",
      filter: false,
      width: 30,
      cellRendererFramework: renderButton.bind(this),
    },
  ]);

  var [rowData, setrowData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 200,
    filter: "agTextColumnFilter",
    // filter: true,
  });

  // const [getRowHeight, setgetRowHeight] = useState(
  //   function (params) {
  //     return 35;
  //   })

  var leaveApplicationHRObj = [];
  var rowDataT = [];

  useEffect(() => {
    loadLeaveApplicationHRData();
    return () => {
      setloading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLeaveApplicationHRData = () => {
    axios
      .get(`${apiUrl}/leave-application-hr`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        // this.leaveApplicationEmpObj = response.data;
        leaveApplicationHRObj = response.data;
        console.log("leaveApplicationHRObj", leaveApplicationHRObj);
        setleaveApplicationHRData(response.data);

        setloading(false);
        rowDataT = [];
        // console.log(leaveApplicationHRObj)
        // let data=this.educationObj.education["0"];  already commented this line
        leaveApplicationHRObj
          .sort((a, b) => (b.toDate > a.toDate ? 1 : -1))
          .map((data) => {
            let temp = {
              data,
              EmployeeName: data["EmployeeName"],
              Leavetype: data["Leavetype"],
              FromDate: data["FromDate"].slice(0, 10),
              ToDate: data["ToDate"].slice(0, 10),
              Reasonforleave: data["Reasonforleave"],
              // Status: this.status(data["Status"]),  commented by me
              Status: status(data["Status"]), //status() function call
            };

            // this.rowDataT.push(temp);

            rowDataT.push(temp);
          });
        // this.setState({ rowData: this.rowDataT });

        //setrowData(rowDataT)
        // console.log('rowDataT values', rowDataT)
        setrowData(rowDataT);

        // console.log('rowData after setrowData', rowData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Delete Function  for HR is disabled for now

  // const onLeaveApplicationHRDelete = (e1, e2) => {
  //   console.log(e1, e2);
  //   if (window.confirm("Are you sure to delete this record? ") == true) {
  //     axios
  //       .delete(
  //         `${apiUrl}/leave-application-hr/` + e1 + "/" + e2, {
  //         headers: {
  //           authorization: localStorage.getItem("token") || ""
  //         }
  //       }
  //       )
  //       .then(res => {
  //         // this.componentDidMount();
  //         loadLeaveApplicationHRData()
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // };

  // componentDidMount() {
  //   this.loadLeaveApplicationEmpData();
  // }

  function renderButton(params) {
    // console.log("here is the params",params);
    // console.log("here is the props data",props.data["_id"])
    // console.log("here is the params.data.data",params.data.data["_id"])
    return (
      <FontAwesomeIcon
        icon={faTrash}
        // onClick={() =>
        //   onLeaveApplicationHRDelete(params.data.data["employee"][0]["_id"], params.data.data["_id"])
        // }
      />
    );
  }
  function renderEditButton(params) {
    // console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditLeaveApplicationHR(params.data.data)}
      />
    );
  }

  const status = (s) => {
    // eslint-disable-next-line eqeqeq
    if (s == 1) {
      return "Pending";
    }
    // eslint-disable-next-line eqeqeq
    if (s == 2) {
      return "Approved";
    }
    // eslint-disable-next-line eqeqeq
    if (s == 3) {
      return "Rejected";
    }
  };
  //   const onEdit = data => {
  //     if (data["Status"] == 1) {
  //       props.onEditLeaveApplicationEmp(data);
  //     } else {
  //       window.alert(
  //         "You can not edit application after it approved or rejected"
  //       );
  //     }
  //   };

  return (
    <div id="table-outer-div-scroll">
      <CBreadcrumb style={{ "--cui-breadcrumb-divider": "'';" }}>
        <CBreadcrumbItem>
          <Link to="/hr">Home</Link>
        </CBreadcrumbItem>
        <CBreadcrumbItem active>Leave Request</CBreadcrumbItem>
      </CBreadcrumb>
      <div className="heading-and-button">
        <div>
          <span id="role-title">Leave Requests</span>
          <br />
          {/* <span id="role-title">Requests</span> */}
        </div>

        {/* <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddLeaveApplicationEmp}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />

        </Button> */}
      </div>
      <div id="clear-both" />

      {!loading ? (
        <div
          id="table-div"
          className="ag-blue"
          style={{ height: "450px", width: "100%", padding: "10px" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // columnTypes={columnTypes}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            rowClassRules={(params) => {
              console.log("params.data.Status", params.data.Status);
              // eslint-disable-next-line eqeqeq
              if (params.data.Status == 2) {
                return (css = { red });
              }
            }}
            // getRowHeight={getRowHeight}
          />
        </div>
      ) : (
        <div id="loading-bar">
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0000ff"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
}

export default LeaveApplicationHRTable;
