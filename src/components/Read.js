// export default function Storage() {
//   return <h1>this is Storage page</h1>;
// }
//import * as React from "react";
import React, { useState, useEffect } from "react";
import Card from "@mui/joy/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Read() {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get("https://6307a08046372013f56db19b.mockapi.io/crud_form")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    
  };
  
  useEffect(() => {
    getData();
  }, []);

  // const useEffect = () => {};
  const handleChange = (id) => {
    axios
      .delete(`https://6307a08046372013f56db19b.mockapi.io/crud_form/${id}`)
      .then(() => {
        getData();
      });
  };
  const setToLocalStorage=(id,firstname,
    lastname,date_of_birth,
    age,city,state,
    address,
    department)=>{
    localStorage.setItem("id",id);
    localStorage.setItem("firstname",firstname);
    localStorage.setItem("lastname",lastname);
    localStorage.setItem("date_of_birth",date_of_birth);
    localStorage.setItem("age",age);
    localStorage.setItem("city",city);
    localStorage.setItem("state",state);
    localStorage.setItem("address",address);
    localStorage.setItem("department",department);


  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> */}
      {/* <h1 style={{textAlign:"center"}}> Read All data </h1> */}
      <Card sx={{ minWidth: 320 }}>
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
        <h1>List of users</h1>

        <table class="table caption-top">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">Date_Of_Birth</th>
              <th scope="col">Age</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Address</th>
              <th scope="col">Department_Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {data.map((eachdata, i) => {
            return (
              <>
                <tbody>
                  <tr key={i}>
                    <th scope="row">{eachdata.id}</th>
                    <td>{eachdata.firstname}</td>
                    <td>{eachdata.lastname}</td>
                    <td>{eachdata.date_of_birth}</td>
                    <td>{eachdata.age}</td>
                    <td>{eachdata.city}</td>
                    <td>{eachdata.state}</td>
                    <td>{eachdata.address}</td>
                    <td>{eachdata.department}</td>

                    <td>
                      <Link to="/update">
                        <button className="btn-success" onClick={()=>setToLocalStorage(
                          eachdata.id,eachdata.firstname,
                          eachdata.lastname,eachdata.date_of_birth,
                          eachdata.age,eachdata.city,eachdata.state,
                          eachdata.address,
                          eachdata.department
                          )}>Edit{" "}</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          handleChange(eachdata.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </Card>
    </div>
  );
}
