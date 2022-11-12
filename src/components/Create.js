import "../styles.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/joy/Card";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { State, City } from "country-state-city";
import Select from "react-select";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
//import Grid from '@mui/material/Grid';
//import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function Create() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [state, setState] = useState("");
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState("");

  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstname === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "First Name Can't be empty"
      });
      return;
    }
    if (lastname === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Last Name Can't be empty"
      });
      return;
    }
    if (date === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Date Of Birth Can't be empty"
      });
      return;
    }
    if (age === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Age Can't be empty"
      });
      return;
    }
    if (state === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "State Can't be empty"
      });
      return;
    }
    if (city === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "City Can't be empty"
      });
      return;
    }
    if (address === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Address Can't be empty"
      });
      return;
    }
    if (department === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Department Can't be empty"
      });
      return;
    }

    axios
      .post("https://6307a08046372013f56db19b.mockapi.io/crud_form", {
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
        history("/read");
      });
  };

  useEffect(() => {
    const data = State.getAllStates();
    let filteredData = [];
    for (let item of data) {
      if (item?.countryCode === "IN") filteredData.push(item);
    }
    setStateData(filteredData);
  }, []);

  const handleState = (value) => {
    let filteredData = [];
    const data = City.getAllCities();
    for (let item of data) {
      if (
        value?.countryCode === item?.countryCode &&
        value?.isoCode === item?.stateCode
      ) {
        filteredData.push(item);
      }
    }
    setCityData(filteredData);
  };

  return (
    <div className="App" style={{ backgroundColor: "#eeeaed" }}>
      <Card sx={{ minWidth: 320 }}>
        <h1>Crud Operation form </h1>

        <TextField
          label="First_Name"
          placeholder="Enter the your first Name…"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          label="Last_Name"
          placeholder="Enter your last Name…"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              disableFuture
              label="Date_Of_Birth"
              openTo="year"
              views={["year", "month", "day"]}
              // placeholder="Enter your Age…"
              value={date}
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
          variant="outlined"
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        {/* <TextField
          label="City"
          placeholder="Choose Your City.."
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
        /> */}
        <Select
          className="bgChange"
          placeholder={"Select state"}
          value={state}
          options={stateData}
          getOptionLabel={(options) => options.name}
          getOptionValue={(options) => options.name}
          onChange={(e) => {
            setState(e);
            handleState(e);
          }}
        />
        <br />
        {/* <TextField
          label="State"
          placeholder="Choose your State"
          variant="outlined"
          onChange={(e) => setState(e.target.value)}
        /> */}
        <Select
          placeholder={"Select city"}
          value={city}
          options={cityData}
          getOptionLabel={(options) => options.name}
          getOptionValue={(options) => options.name}
          onChange={(e) => {
            setCity(e);
          }}
          style={{ backgroundColor: "#64a248" }}
        />
        <br />
        <TextField
          label="Address"
          placeholder="Enter your Address…"
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <TextField
          label="Department"
          placeholder="Enter your department Name…"
          variant="outlined"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        {firstname}
        <br />
        <Link to="/read">
          <Button variant="contained">View Data</Button>
        </Link>

        <br />
      </Card>
    </div>
  );
}
