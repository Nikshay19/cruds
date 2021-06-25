import React, { useState, useEffect } from "react";
import "./DisplayemployeeInfo.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
function DisplayEmployeeInfo(props) {
  const { employee, setemployee } = props.obj;
  const [DisabledState, setDisabledState] = useState([]);
  console.log(">>>>>>>>>> checking Employee state <<<<<<<<<<<<<", employee);

  const employeeUpdateObj = {};
  useEffect(() => {
    console.log(employee, "checking from useeffect");
    if (employee.length > 0 && employee.length !== DisabledState.length) {
      console.log("check check");
      setDisabledState([
        ...DisabledState,
        {
          id: employee[employee.length - 1].id,
          state: true,
        },
      ]);
    }
  }, [employee]);

  console.log(
    DisabledState,
    ">>>>>>>>>>> Checking Disabled State after updating employee state <<<<<<<<<<<<<<<<"
  );

  function editEmployeeDetails(empid) {
    /*  Note: In react when a state is, the values assigen to the state, be it array or individual value
    the state value address is unique, hence we cannot modify the state by altering the
     very state variable itself, that would not effect the state variables used in various logics
     hence, if we need to change the state, the state variable itself should not be altered, 
     the contents of the state variable should be pulled out, store it in a new variable modify it
    then update the state with the new variable, even if a state is an array of object, the state wont be changed
    even if we assign the state variable to a new variable, still each and every individual element(object in this case)
    should be pulled out and store it in a new array and make necessary modification and the new array will be used in 
    updating the state */

    const utdDisabledStated = DisabledState.map((el) => {
      if (el.id === empid) {
        const updatedItem = {
          ...el,
          state: !el.state,
        };

        return updatedItem;
      }

      return el;
    });
    console.log(
      ">>>>>>>>> Checking DisabledState - map func <<<<<<<<<<<<<",
      DisabledState
    );

    setDisabledState(utdDisabledStated);

    /*
this block of code won't work because the state variable itsef is altered and the state is set
by this very altered state vriable

    // var pos = DisabledState.findIndex((el) => el.id === empid);
    // console.log(">>>>>>>>>>>>>>> checking position <<<<<<<<<<",pos);
    // var utdobj = DisabledState.filter((el) => el.id === empid);
    // console.log(">>>>>>>>>>> checking initial obj state <<<<<<<<<<<<<",utdobj);
    // DisabledState.splice(pos, 1);
    // utdobj[0].state = false;
    // DisabledState.splice(pos,0,...utdobj);
    // console.log(">>>>>>>>>>>>> checking final Disbledstate state <<<<<<<<<<", DisabledState);
    // console.log(">>>>>>>>>>>>> checking final obj state <<<<<<<<<<",utdobj);
    // setDisabledState(DisabledState)

  */
    //this block of code works - as the state is set by individually pulling out each and every elements in
    //an array and then storing it in a new array, and this new array is used to set the state
    //  var pos;
    // console.log("declared pos", pos);
    // var buffObj;
    // console.log("declared buffObj", buffObj);
    // console.log(">>>>>>>>>> looping starts <<<<<<<<<<<<");
    // for (let index = 0; index < DisabledState.length; index++) {
    //   console.log("Counting index", index);
    //   if (DisabledState[index].id === empid) {
    //     pos = index;
    //     console.log("pos initialised? ", pos);
    //     buffObj = DisabledState[index];
    //     DisabledState.splice(pos,1);
    //     console.log("buffObj initialised? ", buffObj);
    //     break;
    //   }
    // }
    // buffObj.state = false;
    // DisabledState.splice(pos, 0,buffObj);
    // const arr = [];
    // for (let index = 0; index < DisabledState.length; index++) {
    //   arr.push(DisabledState[index]);
    // }
    // console.log(">>>>>>>>>>> checking final obj state <<<<<<<<<<<<<", buffObj);
    // console.log(">>>>>>>>>>> checking new array  <<<<<<<<<<<<<", arr);

    // setDisabledState(arr)
  }

  function saveEmployeeDetails(emp) {
    const newEmpList = employee.map((el) => {
      if (emp.id === el.id) {
        const obj = { ...emp, ...employeeUpdateObj };
        console.log(obj);
        return obj;
      }
      return el;
    });
    console.log(newEmpList);
    setemployee(newEmpList);

    //setting the disabled state back to true after the save
    const newDisabledStateList = DisabledState.map((el) => {
      if (emp.id === el.id) {
        el.state = true;
        return el;
      }
      return el;
    });
    setDisabledState(newDisabledStateList);
  }

  function deleteEmployee(empid) {
    const newEmployeeList = employee.filter((el) => el.id !== empid);
    setemployee(newEmployeeList);

    const newDisabledStateList = DisabledState.filter((el) => el.id !== empid);
    setDisabledState(newDisabledStateList);
  }
  //Note: using setiing default value in text box with "value" attr makes
  //it impossible to edit the textbox again as
  console.log(
    ">>>>>>>>>> Checking Employee State Before Render <<<<<<<<<<<<<<<<",
    employee
  );
  console.log(
    ">>>>>>>>>> Checking Disabled State Before Render <<<<<<<<<<<<<<<<",
    DisabledState
  );

  function toggleState(id) {
    var pos = DisabledState.findIndex((el) => el.id === id);
    return DisabledState[pos].state;
  }
  return (
    <div>
      <h5 style={{ textAlign: "center", marginTop: "25px" }}>
        Employee Details
      </h5>
      {
        <div className="empcards">
          {employee.length > 0 &&
            DisabledState.length > 0 &&
            employee.length === DisabledState.length &&
            employee.map((el) => (
              <div className="carditems" key={el.id}>
                {el.id}
                <Card style={{ width: "auto", height: "auto" }}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <div className="empdetails">
                        <b>
                          <strong>
                            <label>Name:</label>
                          </strong>
                        </b>

                        <input
                          type="text"
                          id="empname"
                          defaultValue={el.name}
                          onChange={(evt) =>
                            (employeeUpdateObj.name = evt.target.value)
                          }
                          disabled={toggleState(el.id)}
                        ></input>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="empdetails">
                        <b>
                          <strong>
                            <label>Age:</label>
                          </strong>
                        </b>

                        <input
                          type="text"
                          id="empage"
                          defaultValue={el.age}
                          onChange={(evt) =>
                            (employeeUpdateObj.age = evt.target.value)
                          }
                          disabled={toggleState(el.id)}
                        ></input>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="empdetails">
                        <b>
                          <strong>
                            <label>D.O.B:</label>
                          </strong>
                        </b>

                        <input
                          type="text"
                          id="empdob"
                          defaultValue={el.dob}
                          onChange={(evt) =>
                            (employeeUpdateObj.dob = evt.target.value)
                          }
                          disabled={toggleState(el.id)}
                        ></input>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="empdetails">
                        <b>
                          <strong>
                            <label>Designation:</label>
                          </strong>
                        </b>

                        <input
                          type="text"
                          id="empdesig"
                          defaultValue={el.designation}
                          onChange={(evt) =>
                            (employeeUpdateObj.designation = evt.target.value)
                          }
                          disabled={toggleState(el.id)}
                        ></input>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="empdetails">
                        <b>
                          <strong>
                            <label>Address:</label>
                          </strong>
                        </b>

                        <input
                          type="text"
                          id="empaddr"
                          defaultValue={el.address}
                          onChange={(evt) =>
                            (employeeUpdateObj.address = evt.target.value)
                          }
                          disabled={toggleState(el.id)}
                        ></input>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div style={{ textAlign: "center" }}>
                        {toggleState(el.id) && (
                          <Button
                            variant="outline-primary"
                            onClick={() => {
                              editEmployeeDetails(el.id);
                            }}
                          >
                            Edit
                          </Button>
                        )}

                        <span style={{ marginLeft: "1em" }}></span>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            deleteEmployee(el.id);
                          }}
                        >
                          Delete
                        </Button>
                        <span style={{ marginLeft: "1em" }}></span>
                        {!toggleState(el.id) && (
                          <Button
                            variant="outline-success"
                            onClick={() => {
                              saveEmployeeDetails(el);
                            }}
                          >
                            Save
                          </Button>
                        )}
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </div>
            ))}
        </div>
      }
    </div>
  );
}

export default DisplayEmployeeInfo;
