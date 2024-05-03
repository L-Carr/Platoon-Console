import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import StudentAttCard from './StudentAttCard';
import check from "../assets/check.svg"

const RollCall = () => {
  
  const currentDate = new Date().toLocaleDateString();
  const [cohortNames, setCohortNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentCohort, setCurrentCohort] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Name")
  const checkSize = { width: "16px", height: "16px" };
  
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Token ${token}`
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleDropdownSelect = async (name) => {
    setSelectedOption(name);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(prevState => !prevState);
  };

  // const handleDropdownSelect = async (name) => {
  //   setSelectedOption(name);
  // };

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await axios.get('https://127.0.0.1:8000/cohort/', config);
        const cohortData = response.data;
        const names = cohortData.map(cohort => cohort.cohort_name);
        const sortedNames = names.sort((a, b) => a.localeCompare(b));
        setCohortNames(sortedNames);
      } catch (error) {
        console.error('Error fetching cohorts', error);
      }
    };
    fetchCohorts();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      if(selectedOption) {
        try {
          const response = await axios.get(`https://127.0.0.1:8000/accountability/retrieve/?cohort_name=${selectedOption}`, config);
          const sortedData = response.data.sort((a, b) => a.last_name.localeCompare(b.last_name));
          setCurrentCohort(sortedData);
          setActiveSort("Name")
          console.log(currentCohort)
        } catch (error) {
          console.error('Error fetching attendance', error);
        } 
      }
    };
    fetchAttendance();
  }, [selectedOption]);

  const nameSortCohort = () => {
    const sortedData = currentCohort
      .sort((a, b) => a.last_name.localeCompare(b.last_name)) 
    setCurrentCohort(sortedData);
    setActiveSort("Name")
    console.log(currentCohort);
  };

  const statusSortCohort = () => {
    const sortedData = currentCohort
      .sort((a, b) => a.last_name.localeCompare(b.last_name)) 
      .sort((a, b) => a.accountability_status - b.accountability_status); 
    setCurrentCohort(sortedData);
    setActiveSort("Status")
    console.log(currentCohort);
  };


  return (
    <div>
      <h3 className="tertiaryH3">Daily Attendance {currentDate}</h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{marginTop: "20px", marginRight: "10px", marginBottom: "20px"}}>
        <DropdownToggle caret>
          {selectedOption !== null ? `${selectedOption}` : 'Select Cohort'}
        </DropdownToggle>
        <DropdownMenu>
          {cohortNames.map(name => (
            <DropdownItem key={name} onClick={() => handleDropdownSelect(name)}>
              {name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown isOpen={sortDropdownOpen} toggle={toggleSortDropdown} style={{marginTop: "20px", marginBottom: "20px"}}>
        <DropdownToggle caret>
          {selectedOption !== null ? `${selectedOption}` : 'Sort By'}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem  onClick={nameSortCohort}>
              Name {activeSort === "Name" && <img src={check} alt="Selected" style={checkSize} />}
            </DropdownItem>
            <DropdownItem  onClick={statusSortCohort}>
              Status {activeSort === "Status" && <img src={check} alt="Selected" style={checkSize} />}
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
      <ul>
      {/* <div> */}
      <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {currentCohort.map((student, index) => (
          // <li key={index}><input type="checkbox"></input>{student.first_name} {student.last_name}</li>
          <StudentAttCard 
          key={index}
          id={student.id} 
          first_name={student.first_name} 
          last_name={student.last_name}
          accountability_status={student.accountability_status}
          absence_reason={student.absence_reason}
          excused_status={student.excused_status}
          pair_status={student.pair_status}
          />
        ))}
    </div>
      </ul>
    </div>
  );
}

export default RollCall;
