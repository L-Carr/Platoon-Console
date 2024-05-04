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
  const [cohortDropdownOpen, setCohortDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://127.0.0.1:8000/cohort/', {
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
    }
  }, [selectedCohort]);

  const toggleCohortDropdown = () => setCohortDropdownOpen(prevState => !prevState);

  const handleCohortSelect = async (name) => {
    setSelectedCohort(name);
    setCohortDropdownOpen(false);
  };

  const updateDemos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`https://127.0.0.1:8000/demo/all/${selectedCohort}/`, {}, {
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

  const toggleDemoDropdown = (index) => {
    setDemos(demos.map((item, i) => index === i ? { ...item, dropdownOpen: !item.dropdownOpen } : item));
  };

  const toggleDemoCard = (index) => {
    setDemos(demos.map((item, i) => index === i ? { ...item, isOpen: !item.isOpen } : item));
  };

  const handleStatusChange = async (index, status) => {
    const demoId = demos[index].student;
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`https://127.0.0.1:8000/demo/student/${demoId}/`, { status: status }, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Status updated successfully: ", response.data);
      updateDemos(selectedCohort);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleRandomOnDeck = async () => {
    const todoStudents = demos.filter(demo => demo.status === 'to do');
    const onDeckStudent = demos.find(demo => demo.status === 'on deck');

    if (onDeckStudent) {
      await handleStatusChange(demos.findIndex(demo => demo.student === onDeckStudent.student), 'to do');
    }

    if (todoStudents.length > 0) {
      const randomIndex = Math.floor(Math.random() * todoStudents.length);
      await handleStatusChange(demos.findIndex(demo => demo.student === todoStudents[randomIndex].student), 'on deck');
    }
  };

  const resetDemoList = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`https://127.0.0.1:8000/demo/reset/${selectedCohort}/`, {}, {
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

  return (
    <>
      <h3 className="tertiaryH3">Demo Tracking</h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Dropdown isOpen={cohortDropdownOpen} toggle={toggleCohortDropdown} style={{ marginTop: "20px", marginRight: "10px", marginBottom: "20px" }}>
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
        <Button color="secondary" onClick={handleRandomOnDeck} style={{ marginTop: "20px", marginBottom: "20px", marginRight: "10px" }}>Random On Deck</Button>
        <Button color="secondary" onClick={resetDemoList} style={{ marginTop: "20px", marginBottom: "20px" }}>Reset All</Button>
      </div>
      <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {demos.map((demo, index) => (
          <Card key={index} style={{ borderRadius: "5px", backgroundColor: demo.status === 'to do' ? "grey" : demo.status === 'on deck' ? "#f05a1b" : "#3b7f82" }} className={demo.isOpen ? "demoCardOpen" : "demoCardClosed"}>
            <CardBody>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <img src={demo.isOpen ? caretDown : caretRight} style={{ width: "32px", height: "32px", borderRadius: "50%" }} onClick={() => toggleDemoCard(index)} />
                <span>{demo.first_name} {demo.last_name}</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Dropdown isOpen={demo.dropdownOpen} toggle={() => toggleDemoDropdown(index)}>
                  <DropdownToggle className="attendanceDropdown" caret>
                    Status:
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
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Demos;
