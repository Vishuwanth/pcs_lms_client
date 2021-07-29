import React, { Component } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


import { useState } from "react";
import { useEffect } from "react";



const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function LeaveApplicationHRTable(props) {

  const [leaveApplicationHRData, setleaveApplicationHRData] = useState([])
  const [loading, setloading] = useState(true)
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
      headerName: "FromDate",
      field: "FromDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "ToDate",
      field: "ToDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Reasonforleave",
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
      cellRendererFramework: renderEditButton.bind(this)
    },
    {
      headerName: "",
      field: "delete",
      filter: false,
      width: 30,
      cellRendererFramework: renderButton.bind(this)
    }
  ])


  var [rowData, setrowData] = useState([])
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 200,
    filter: "agTextColumnFilter"
    // filter: true ,
  })


  // const [getRowHeight, setgetRowHeight] = useState(
  //   function (params) {
  //     return 35;
  //   })


  var leaveApplicationHRObj = [];
  var rowDataT = [];



  useEffect(() => {
    loadLeaveApplicationHRData()
  }, [])

  const loadLeaveApplicationHRData = () => {
    axios
      .get(
        "https://pcs-lms.herokuapp.com/leave-application-hr/",
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then(response => {
        // this.leaveApplicationEmpObj = response.data;
        leaveApplicationHRObj = response.data

        console.log("leaveApplicationHRObj::::",leaveApplicationHRObj)
        // this.setState({ leaveApplicationEmpData: response.data });
        // this.setState({ loading: false });
        // this.rowDataT = [];

        setleaveApplicationHRData(response.data)

        setloading(false)
        rowDataT = []
        console.log(leaveApplicationHRObj)
        // let data=this.educationObj.education["0"];  already commented this line
        leaveApplicationHRObj.map(data => {
          let temp = {
            data,
            EmployeeName:data["EmployeeName"],
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            // Status: this.status(data["Status"]),  commented by me
            Status: status(data["Status"]),   //status() function call

          };

          // this.rowDataT.push(temp);

          rowDataT.push(temp)
        });
        // this.setState({ rowData: this.rowDataT });


        //setrowData(rowDataT)
        console.log("rowDataT values", rowDataT)
        setrowData(rowDataT)
        console.log("rowData after setrowData", rowData)

      })
      .catch(error => {
        console.log(error);
      });
  };

  //Delete Function  for HR is disabled for now

  // const onLeaveApplicationHRDelete = (e1, e2) => {
  //   console.log(e1, e2);
  //   if (window.confirm("Are you sure to delete this record? ") == true) {
  //     axios
  //       .delete(
  //         "https://pcs-lms.herokuapp.com/leave-application-hr/" + e1 + "/" + e2, {
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
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditLeaveApplicationHR(params.data.data)}
      />
    );
  }

  const status = s => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
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
      <div className="heading-and-button">
      <div>
        <span id="role-title">Leave Requests</span><br/>
        {/* <span id="role-title">Requests</span> */}
        </div>

        <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddLeaveApplicationEmp}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
        
        </Button>
      </div>
      <div id="clear-both" />


      {!loading ? (
        <div
          id="table-div"
          className="ag-theme-balham"
          style={{ height: "350px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // columnTypes={columnTypes}
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
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