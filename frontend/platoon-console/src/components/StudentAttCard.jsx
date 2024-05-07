import { Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input } from 'reactstrap';
import { useState } from 'react';
import axios from "axios";
import caretRight from "../assets/caret-right.svg"
import caretDown from "../assets/caret-down.svg"
import check from "../assets/check.svg"

const StudentAttCard = ({ id, first_name, last_name, accountability_status, excused_status, pair_status, absence_reason }) => {

    const token = localStorage.getItem('token');
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [accountabilityStatus, setAccountabilityStatus] = useState(accountability_status)
    const [excusedStatus, setExcusedStatus] = useState(excused_status)
    const [pairStatus, setPairStatus] = useState(pair_status)
    const [absenceReason, setAbsenceReason] = useState(absence_reason)
    const [checked, setChecked] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [excusedDropdownOpen, setExcusedDropdownOpen] = useState(false);
    const [pairDropdownOpen, setPairDropdownOpen] = useState(false);
    const [workoutClass, setWorkoutClass] = useState("workoutCardClosed")
    const checkSize = { width: "16px", height: "16px" };

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const toggleExcusedDropdown = () => setExcusedDropdownOpen(prevState => !prevState);
    const togglePairDropdown = () => setPairDropdownOpen(prevState => !prevState);

    const handleAccountabilityChange = (value) => {
        setAccountabilityStatus(value);
        if (value === 2) {
            setExcusedStatus(false);
            setPairStatus(true);
        } else if (value === 1) {
            setPairStatus(false);
        }
    };

    const handleExcusedChange = (value) => {
        setExcusedStatus(value);
    };

    const handlePairChange = (value) => {
        setPairStatus(value);
    };

    const handleSubmit = () => {
        toggleDone();
        // Make API call to send data to backend
        const data = {
            id: id,
            accountability_status: accountabilityStatus,
            absence_reason: absenceReason,
            excused_status: excusedStatus,
            pair_status: pairStatus
        };
        console.log(data);
    
        axios.patch(`http://127.0.0.1:8000/accountability/alter/${id}/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    const toggleDone = () => {
        setChecked(!checked);
        setWorkoutClass(prevClass => prevClass === "workoutCardClosed" ? "workoutCardOpen" : "workoutCardClosed");
    };

    return (
        <Card style={{ borderRadius: "5px", backgroundColor: excusedStatus ? "#f7d148" : accountabilityStatus === 2 ? "#3b7f82" : accountabilityStatus === 1 ? "#f05a1b" : "grey" }} className={workoutClass}>
            <CardBody>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <img src={checked ? caretDown : caretRight} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={toggleDone} />
                    <span>{first_name} {last_name}</span>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle className="attendanceDropdown" caret>
                            Status:
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={() => handleAccountabilityChange(1)}>
                                Absent {accountabilityStatus === 1 && <img src={check} alt="Selected" style={checkSize} />}
                            </DropdownItem>
                            <DropdownItem onClick={() => handleAccountabilityChange(2)}>
                                Present {accountabilityStatus === 2 && <img src={check} alt="Selected" style={checkSize} />}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {accountabilityStatus === 1 && (
                    <>
                        <div style={{ marginTop: "10px" }}>
                            <Dropdown isOpen={excusedDropdownOpen} toggle={toggleExcusedDropdown}>
                                <DropdownToggle className="attendanceDropdown" caret>
                                    Excused?
                                </DropdownToggle>
                                <DropdownMenu container="body">
                                    <DropdownItem onClick={() => handleExcusedChange(true)}>
                                        Yes {excusedStatus === true && <img src={check} alt="Selected" style={checkSize} />}
                                    </DropdownItem>
                                    <DropdownItem onClick={() => handleExcusedChange(false)}>
                                        No {excusedStatus === false && <img src={check} alt="Selected" style={checkSize} />}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            {/* Excuse: {absenceReason} */}
                            <Input
                                
                                name="absenceReason"
                                type="textarea"
                                id="absenceReason"
                                placeholder={absenceReason}
                                value={absenceReason}
                                onChange={(e) => setAbsenceReason(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div style={{ marginTop: "10px" }}>
                    <Dropdown isOpen={pairDropdownOpen} toggle={togglePairDropdown}>
                        <DropdownToggle className="attendanceDropdown" caret>
                            Pair:
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={() => handlePairChange(true)}>
                                Yes {pairStatus === true && <img src={check} alt="Selected" style={checkSize} />}
                            </DropdownItem>
                            <DropdownItem onClick={() => handlePairChange(false)}>
                                No {pairStatus === false && <img src={check} alt="Selected" style={checkSize} />}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <Button className="attendanceDropdown" style={{ marginTop: "10px" }} onClick={handleSubmit}>Submit</Button>
            </CardBody>
        </Card>
    );
};

export default StudentAttCard;
