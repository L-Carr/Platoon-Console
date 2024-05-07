import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import StudentAttCard from './StudentAttCard';
import check from "../assets/check.svg";
import { useNavigate } from 'react-router-dom';

const RollCall = () => {
  
  // const currentDate = new Date().toISOString().split('T')[0];
  const currentDate = new Date().toISOString("en-US", {
    timeZone: "America/Chicago",
  }).split('T')[0];

  const [fetchDate, setFetchDate] = useState(currentDate);
  const [cohortNames, setCohortNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentCohort, setCurrentCohort] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Name");
  const [errorMessage, setErrorMessage] = useState("");
  const checkSize = { width: "16px", height: "16px" };
  const [isInstructor, setIsInstructor] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const checkInstructor = () => {
      const userGroup = localStorage.getItem('user_groups')
      if (userGroup.includes('Instructors')) {
        setIsInstructor(true)
      } else (
        navigate('/')
      )
    };
    checkInstructor();
  }, []);
  
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
      if (selectedOption) {
        try {
          const response = await axios.get(`https://127.0.0.1:8000/accountability/retrieve/?cohort_name=${selectedOption}`, config);
          let sortedData = response.data.filter(item => item.accountability_date === fetchDate);

          if (sortedData.length === 0) {
            setCurrentCohort([]);
            setErrorMessage("No attendance records for the specified date");
          } else {
            setErrorMessage("");
            if (activeSort === "Name") {
              sortedData = sortedData.sort((a, b) => a.last_name.localeCompare(b.last_name));
            } else if (activeSort === "StatusAsc") {
              sortedData = sortedData.sort((a, b) => a.accountability_status - b.accountability_status);
            } else if (activeSort === "StatusDesc") {
              sortedData = sortedData.sort((a, b) => b.accountability_status - a.accountability_status);
            }
            setCurrentCohort(sortedData);
          }
        } catch (error) {
          console.error('Error fetching attendance', error);
        }
      }
    };
    fetchAttendance();
  }, [selectedOption, activeSort, fetchDate]);
  

  const nameSortCohort = () => {
    setActiveSort("Name");
  };

  const statusSortCohortAsc = () => {
    setActiveSort("StatusAsc");
  };
  
  const statusSortCohortDesc = () => {
    setActiveSort("StatusDesc");
  };

  const handleDateChange = (event) => {
    setFetchDate(event.target.value);
  };

  return (
    <div>
      <h3 className="tertiaryH3">Daily Attendance {fetchDate}</h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{marginTop: "20px", marginRight: "10px", marginBottom: "20px"}}>
          <DropdownToggle className="attendanceDropdown" caret>
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
          <DropdownToggle className="attendanceDropdown" caret>
            Sort by:
          </DropdownToggle>
          <DropdownMenu>
              <DropdownItem  onClick={nameSortCohort}>
                Name {activeSort === "Name" && <img src={check} alt="Selected" style={checkSize} />}
              </DropdownItem>
              <DropdownItem  onClick={statusSortCohortAsc}>
                Status Asc {activeSort === "StatusAsc" && <img src={check} alt="Selected" style={checkSize} />}
              </DropdownItem>
              <DropdownItem  onClick={statusSortCohortDesc}>
                Status Desc {activeSort === "StatusDesc" && <img src={check} alt="Selected" style={checkSize} />}
              </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div style={{marginLeft: "10px"}}>
          <input 
            type="date" 
            className="form-control"
            value={fetchDate} 
            onChange={handleDateChange}
          />
        </div>
      </div>
      <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
      <ul>
        <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {currentCohort.map((student) => (
            <StudentAttCard 
              key={student.id}
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
