import React, { useState, useEffect } from "react";
import "./CreateForm.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import DisplayEmployeeInfo from "./DisplayData";
import "bootstrap/dist/css/bootstrap.css";

function CreateForm() {
  const [employee, setemployee] = useState([]);

  const [uid, setuid] = useState(0);

  const employeeObj = {
    id: "",
    name: "",
    age: "",
    dob: "",
    designation: "",
    address: "",
  };

  function createEmployee() {
    console.log(uid);
    employeeObj.id = uid;
    setemployee([...employee, employeeObj]);
  }

  return (
    <>
      <div className="createemp">
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(event) => (employeeObj.name = event.target.value)}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Age</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(event) => (employeeObj.age = event.target.value)}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">D.O.B</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(event) => (employeeObj.dob = event.target.value)}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Designation
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(event) => (employeeObj.designation = event.target.value)}
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="Address.."
            onChange={(event) => (employeeObj.address = event.target.value)}
          />
        </InputGroup>
        <Button
          variant="outline-info"
          className="createbtn"
          onClick={() => {
            setuid(uid + 1);
            createEmployee();
          }}
        >
          Create
        </Button>
      </div>
      <DisplayEmployeeInfo obj={{ employee, setemployee }} />
    </>
  );
}

export default CreateForm;
