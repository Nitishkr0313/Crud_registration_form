import TextField from "@mui/material/TextField";
import Card from "@mui/joy/Card";
import Button from "@mui/material/Button";
//import React, { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const [id, setId] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [state, setState] = useState("");
  // const [stateData, setStateData] = useState([]);
  // const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstname"));
    setLastName(localStorage.getItem("lastname"));
    setDate(localStorage.getItem("date"));
    setAge(localStorage.getItem("age"));
    setState(localStorage.getItem("state"));
    setCity(localStorage.getItem("city"));
    setAddress(localStorage.getItem("address"));
    setDepartment(localStorage.getItem("department"));
  }, []);
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("id....", id);
    axios
      .put(`https://6307a08046372013f56db19b.mockapi.io/crud_form/$(id)`, {
        id: id,
        firstname: firstname,
        lastname: lastname,
        date_of_birth: date,
        age: age,
        city: city.name,
        state: state.name,
        address: address,
        department: department
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <div className="App">
      <Card sx={{ minWidth: 320 }}>
        <h1>Update The Page </h1>

        <TextField
          label="First_Name"
          placeholder="Enter the your first Name…"
          value={firstname}
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          label="Last_Name"
          placeholder="Enter your last Name…"
          value={lastname}
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              disableFuture
              label="Date_Of_Birth"
              openTo="year"
              views={["year", "month", "day"]}
              value={date}
              placeholder="Enter your Age…"
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <br />
        <TextField
          label="Age"
          placeholder="Enter your Age…"
          value={age}
          variant="outlined"
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <TextField
          label="City"
          placeholder="Choose Your City.."
          value={city}
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <TextField
          label="State"
          placeholder="Choose your State"
          value={state}
          variant="outlined"
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <TextField
          label="Address"
          placeholder="Enter your Address…"
          value={address}
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <TextField
          label="Department"
          placeholder="Enter your department Name…"
          value={department}
          variant="outlined"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />

        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>

        <br />
        <Link to="/read">
          <Button variant="contained">View Data</Button>
        </Link>
        <br />
      </Card>
    </div>
  );
}
