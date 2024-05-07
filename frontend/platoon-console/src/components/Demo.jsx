import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, Button } from 'reactstrap';
import caretRight from "../assets/caret-right.svg"
import caretDown from "../assets/caret-down.svg"
import check from "../assets/check.svg"

const Demos = () => {
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [demos, setDemos] = useState([]);
  const [teamDemos, setTeamDemos] = useState([]);
  const [cohortDropdownOpen, setCohortDropdownOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('Students');  // 'Students' or 'Teams'
  const [selectionDropdownOpen, setSelectionDropdownOpen] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false)

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

  useEffect(() => {
    const checkInstructor = () => {
      const userGroup = localStorage.getItem('user_groups')
      if (userGroup.includes('Instructors')) {
        setIsInstructor(true)
      }
    };
    checkInstructor();
  }, []);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/cohort/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });

        setCohorts(response.data.map(cohort => cohort.cohort_name));
      } catch (error) {
        console.error('Error fetching cohorts', error);
      }
    };
    fetchCohorts();
  }, []);

  useEffect(() => {
    if (selectedCohort) {
      updateDemos(selectedCohort);
      updateTeamDemos(selectedCohort);
    }
  }, [selectedCohort]);

  const toggleCohortDropdown = () => setCohortDropdownOpen(prevState => !prevState);

  const toggleSelectionDropdown = () => setSelectionDropdownOpen(prevState => !prevState);

  const handleCohortSelect = async (name) => {
    setSelectedCohort(name);
    setCohortDropdownOpen(false);
  };

  const handleDemoSelect = async (name) => {
    setSelectedDemo(name);
    setSelectionDropdownOpen(false);
  }

  const updateDemos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`http://127.0.0.1:8000/demo/all/${selectedCohort}/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const sortedDemos = response.data.sort((a, b) => {
        const statusOrder = { 'on deck': 1, 'to do': 2, 'complete': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      setDemos(sortedDemos.map(demo => ({ ...demo, isOpen: false, dropdownOpen: false })));
    } catch (error) {
      console.error('Error fetching demos', error);
    }
  };

  const updateTeamDemos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`http://127.0.0.1:8000/demo/teams/${selectedCohort}/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const sortedDemos = response.data.sort((a, b) => {
        const statusOrder = { 'on deck': 1, 'to do': 2, 'complete': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      setTeamDemos(sortedDemos.map(demo => ({ ...demo, isOpen: false, dropdownOpen: false })));
    } catch (error) {
      console.error('Error fetching team demos', error);
    }
  }

  const toggleDemoDropdown = (index) => {
    setDemos(demos.map((item, i) => index === i ? { ...item, dropdownOpen: !item.dropdownOpen } : item));
  };

  const toggleDemoCard = (index) => {
    setDemos(demos.map((item, i) => index === i ? { ...item, isOpen: !item.isOpen } : item));
  };

  const toggleTeamDemoDropdown = (index) => {
    setTeamDemos(teamDemos.map((item, i) => index === i ? { ...item, dropdownOpen: !item.dropdownOpen} : item));
  }

  const toggleTeamDemoCard = (index) => {
    setTeamDemos(teamDemos.map((item, i) => index === i ? { ...item, isOpen: !item.isOpen} : item));
  }

  const handleStatusChange = async (index, status, fromRandom = false) => {
    const demoId = demos[index].student;
    try {
      const token = localStorage.getItem("token")

      // Check if any other student already has 'on deck' status
      const onDeckStudentIndex = demos.findIndex(demo => demo.status === 'on deck');
      if (status === 'on deck' && onDeckStudentIndex !== -1 && onDeckStudentIndex !== index) {
        await handleStatusChange(onDeckStudentIndex, 'to do');
      }

      const response = await axios.put(`http://127.0.0.1:8000/demo/student/${demoId}/`, { status: status }, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Status updated successfully: ", response.data);
      if (!fromRandom) {
        updateDemos(selectedCohort);
      }
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleTeamStatusChange = async (index, status) => {
    const demoId = teamDemos[index].team;
    try {
      const token = localStorage.getItem("token")

      // Check if any other team already has an 'on deck' status
      const onDeckTeamIndex = teamDemos.findIndex(demo => demo.status === 'on deck');
      if (status === 'on deck' && onDeckTeamIndex !== -1 && onDeckTeamIndex !== index) {
        await handleTeamStatusChange(onDeckTeamIndex, 'to do');
      }

      const response = await axios.put(`http://127.0.0.1:8000/demo/team/${demoId}/`, {status: status}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Team status updated successfully: ", response.data);
      updateTeamDemos(selectedCohort);
    } catch (error) {
      console.error("Error updating team status: ", error);
    }
  }

  const handleRandomOnDeck = async () => {
    const todoStudents = demos.filter(demo => demo.status === 'to do');
    const onDeckStudent = demos.find(demo => demo.status === 'on deck');

    if (onDeckStudent) {
      // Avoid flickering when clicking Random On Deck
      handleStatusChange(demos.findIndex(demo => demo.student === onDeckStudent.student), 'to do', true)
        .then(() => {
          if (todoStudents.length > 0) {
            const randomIndex = Math.floor(Math.random() * todoStudents.length);
            handleStatusChange(demos.findIndex(demo => demo.student === todoStudents[randomIndex].student), 'on deck', true)
              .then(() => updateDemos());
          }
        });
    } else {
      if (todoStudents.length > 0) {
        const randomIndex = Math.floor(Math.random() * todoStudents.length);
        handleStatusChange(demos.findIndex(demo => demo.student === todoStudents[randomIndex].student), 'on deck', true)
          .then(() => updateDemos());
      }
    }
  };


  const resetDemoList = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`http://127.0.0.1:8000/demo/reset/${selectedCohort}/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      updateDemos();
    } catch (error) {
      console.error("Error resetting demo list:", error);
    }
  };

  const resetTeamDemoList = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`http://127.0.0.1:8000/demo/resetteams/${selectedCohort}/`, {}, {
        headers : {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      updateTeamDemos();
    } catch (error) {
      console.error("Error resetting team demo list:", error);
    }
  }

  return (
    <>
      <h2 className="mainH2">Demo Tracking</h2>
      {isInstructor && selectedDemo === "Students" && (
        <>
          <Button color="secondary" onClick={handleRandomOnDeck} className="demoDropButton">Random Student On Deck</Button>
          <Button color="secondary" onClick={resetDemoList} className="demoDropButton">Reset All Students</Button>
        </>
      )}
      {isInstructor && selectedDemo !== "Students" && (
        <Button color="secondary" onClick={resetTeamDemoList} style={{ marginTop: "20px", marginBottom: "20px" }}>Reset All Teams</Button>
      )}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Dropdown isOpen={cohortDropdownOpen} toggle={toggleCohortDropdown} style={{ margin: "10px 10px 10px 10px" }}>
          <DropdownToggle className="attendanceDropdown" caret>
            {selectedCohort !== null ? `${selectedCohort}` : 'Select Cohort'}
          </DropdownToggle>
          <DropdownMenu>
            {cohorts.map(name => (
              <DropdownItem key={name} onClick={() => { handleCohortSelect(name); toggleCohortDropdown(); }}>
                {name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={selectionDropdownOpen} toggle={toggleSelectionDropdown} style={{ margin: "10px 10px 10px 10px" }}>
          <DropdownToggle className="attendanceDropdown" caret>
            {selectedDemo !== null ? `${selectedDemo}` : 'Select Demo'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => { handleDemoSelect('Students'); toggleSelectionDropdown(); }}>Students</DropdownItem>
            <DropdownItem onClick={() => { handleDemoSelect('Teams'); toggleSelectionDropdown(); }}>Teams</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {selectedDemo === "Students" ? (
        <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {demos.map((demo, index) => (
            <Card key={index} style={{ borderRadius: "5px", backgroundColor: demo.status === 'to do' ? "grey" : demo.status === 'on deck' ? "#f05a1b" : "#3b7f82" }} className={demo.isOpen ? "demoCardOpen" : "demoCardClosed"}>
              <CardBody>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <img src={demo.isOpen ? caretDown : caretRight} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={() => toggleDemoCard(index)} />
                  <span>{demo.first_name} {demo.last_name}</span>
                </div>

                <div style={{ marginTop: "10px" }}>
                  {isInstructor ? (
                    <Dropdown isOpen={demo.dropdownOpen} toggle={() => toggleDemoDropdown(index)}>
                      <DropdownToggle className="attendanceDropdown" caret>
                        {toTitleCase(demo.status)}
                      </DropdownToggle>
                      <DropdownMenu container="body">
                        <DropdownItem onClick={() => handleStatusChange(index, 'to do')}>
                          To Do {demo.status === 'to do' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                        <DropdownItem onClick={() => handleStatusChange(index, 'on deck')}>
                          On Deck {demo.status === 'on deck' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                        <DropdownItem onClick={() => handleStatusChange(index, 'complete')}>
                          Complete {demo.status === 'complete' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Button color="secondary" style={{ width: "180px", pointerEvents: "none" }}>
                      {toTitleCase(demo.status)}
                    </Button>
                  )}
                </div>

              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {teamDemos.map((demo, index) => (
            <Card key={index} style={{ borderRadius: "5px", backgroundColor: demo.status === 'to do' ? "grey" : demo.status === 'on deck' ? "#f05a1b" : "#3b7f82" }} className={demo.isOpen ? "demoCardOpen" : "demoCardClosed"}>
              <CardBody>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <img src={demo.isOpen ? caretDown : caretRight} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={() => toggleTeamDemoCard(index)} />
                  <span>{demo.team_name}</span>
                </div>

                <div style={{ marginTop: "10px" }}>
                  {isInstructor ? (
                    <Dropdown isOpen={demo.dropdownOpen} toggle={() => toggleTeamDemoDropdown(index)}>
                      <DropdownToggle className="attendanceDropdown" caret>
                      {toTitleCase(demo.status)}
                      </DropdownToggle>
                      <DropdownMenu container="body">
                        <DropdownItem onClick={() => handleTeamStatusChange(index, 'to do')}>
                          To Do {demo.status === 'to do' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                        <DropdownItem onClick={() => handleTeamStatusChange(index, 'on deck')}>
                          On Deck {demo.status === 'on deck' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                        <DropdownItem onClick={() => handleTeamStatusChange(index, 'complete')}>
                          Complete {demo.status === 'complete' && <img src={check} alt="Selected" style={{ width: "16px", height: "16px" }} />}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Button color="secondary" style={{ width: "180px", pointerEvents: "none" }}>
                      {toTitleCase(demo.status)}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>

  );
};

export default Demos;
