import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { useState } from 'react';
import axios from "axios";
import checkboxFilled from "../assets/checkboxFilled.svg"
import checkboxEmpty from "../assets/checkboxEmpty.svg"

const StudentAttCard = ({ id, first_name, last_name, accountability_status, excused_status, pair_status }) => {

    const token = localStorage.getItem('token');
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [accountabilityStatus, setAccountabilityStatus] = useState(accountability_status)
    const [excusedStatus, setExcusedStatus] = useState(excused_status)
    const [pairStatus, setPairStatus] = useState(pair_status)
    const [checked, setChecked] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [excusedDropdownOpen, setExcusedDropdownOpen] = useState(false);
    const [workoutClass, setWorkoutClass] = useState("workoutCardClosed");

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleExcusedDropdown = () => setExcusedDropdownOpen(prevState => !prevState);

    const handleAccountabilityChange = (value) => {
      setAccountabilityStatus(value);
    };

    const handleExcusedChange = (value) => {
      setExcusedStatus(value);
    };

    const handleSubmit = () => {
      // Make API call to send data to backend
      const data = {
        id: id,
        accountability_status: accountabilityStatus,
        excused_status: excusedStatus
      };
      console.log(data);
      // Example API call
      // axios.post('your-backend-api-url', data, {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // })
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // });
    };

    const toggleDone = () => {
        setChecked(!checked);
        setWorkoutClass(prevClass => prevClass === "workoutCardClosed" ? "workoutCardOpen" : "workoutCardClosed");
    };

    return (
      <Card style={{ backgroundColor: accountabilityStatus === 2 ? "green" : accountabilityStatus === 1 ? "red" : "grey" }} className={workoutClass}>
        <CardBody>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <img src={checked ? checkboxFilled : checkboxEmpty} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={toggleDone} />
            <span>{first_name} {last_name}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                Status:
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem onClick={() => handleAccountabilityChange(0)}>Not Responded</DropdownItem>
                <DropdownItem onClick={() => handleAccountabilityChange(1)}>Absent</DropdownItem>
                <DropdownItem onClick={() => handleAccountabilityChange(2)}>Present</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {accountabilityStatus === 1 &&
            <div style={{ marginTop: "10px" }}>
              <Dropdown isOpen={excusedDropdownOpen} toggle={toggleExcusedDropdown}>
                <DropdownToggle caret>
                  Excused? {excusedStatus ? "Yes" : "No"}
                </DropdownToggle>
                <DropdownMenu container="body">
                  <DropdownItem onClick={() => handleExcusedChange(true)}>Yes</DropdownItem>
                  <DropdownItem onClick={() => handleExcusedChange(false)}>No</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          }
          <Button style={{ marginTop: "10px" }} onClick={handleSubmit}>Submit</Button>
        </CardBody>
      </Card>
    );
};

export default StudentAttCard;
