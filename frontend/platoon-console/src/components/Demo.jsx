import axios from 'axios';
import {useState, useEffect} from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [demos, setDemos] = useState([])
  const [nextStudent, setNextStudent] = useState("")
  const [studentId, setStudentId] = useState(0)
  const [newStatus, setNewStatus] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const updateDemos = async () => {
    // Uses a post request to check with backend and create records for any student who does not have a demo record, gets current updated list of all demo records
    try {
      const userCohort = "Whiskey"
      const token = localStorage.getItem("token")

      const response = await axios.post(`https://127.0.0.1:8000/demo/all/${userCohort}/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setDemos(response.data)
      setNextStudent(response.data)
      if (response.data.length > 0) {
        setStudentId(response.data[0])
      } else {
        setNextStudent("")
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorMessage(errorMessage);
        console.log('Error', errorMessage);
      }
    }
  }

  useEffect(() => {
    updateDemos();

  }, []);


  //get request to list one student status
  const getDemoStatus = async (studentId, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      if (demos.length > 0) {
        setStudentId(demos[0].student)
      }
      const response = await axios.get(`https://127.0.0.1:8000/demo/student/${studentId}/`, {}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log("Status updated successfully: ", response.data)
    } catch (error){
      console.error("Error ")
    }
    
  }

  /*
  onClick method to hit endpoint: 
  https://127.0.0.1:8000/demo/student/<student_id>/
  use demo.student for id
  put request
  body: {"status":"update"}
  options: "on deck", "complete"
  display text with current status or button to update?
  */
  const updateDemoStatus = async (studentId, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`https://127.0.0.1:8000/demo/student/${studentId}/`, {status: newStatus}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      updateDemos()
      console.log("Status updated successfully: ", response.data)
    } catch (error){
      console.error("Error ")
    }
    
  }

  /*
  Instructor button:
  Reset all cohort demos:
  https://127.0.0.1:8000/demo/reset/<cohort_name>/
  use demo.cohort or whatever method is used to identify cohort
  will return a list of all students with updated statuses
  - does not include first names and last names
  */

  //this reset function sets all statuses back to to do
 const resetDemoList = async () => {
  try {
    const userCohort = "Whiskey"
    const token = localStorage.getItem("token")
    const response = await axios.put(`https://127.0.0.1:8000/demo/reset/${userCohort}/`, {}, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    updateDemos()
  } catch (error){
    console.error("Error resetting demo list:", error)
  }
 }

 useEffect(() => {
  updateDemos()
 }, [])

 const toggleDropDown = (demoId) => {
  setDropdownOpen((prevId) => (prevId === demoId ? null : demoId))
 }

 const handleStatusChange = async (studentId, newStatus) => {
  console.log(`Status updated for student ${studentId} to ${newStatus}: ` + selectedStatus);
  try {
    const token = localStorage.getItem("token");
    // Update the status of each student in demos array
    const response = await axios.put(
        `https://127.0.0.1:8000/demo/student/${studentId}/`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const updatedDemos = demos.map(demo => {
        if (demo.id === studentId) {
          return { ...demo, status: newStatus };
        }
        return demo;
      });
      setDemos(updatedDemos)
      setSelectedStatus(newStatus)
      console.log(demos)
      console.log("Status updated successfully: ", response.data);
    }
   catch (error) {
    console.error("Error updating status: ", error);
  }
 }

  return (
    <>
    <ul className="consoleCardUl">
    {nextStudent && (
      <div className='p-3'>
        <h1>Next Student Up for Demo</h1>
        <p>{nextStudent[0].first_name} {nextStudent[0].last_name}</p>
      </div>
    )}
    <div className='p-4'>

      <li>Student - Status</li>
      <Button onClick={resetDemoList}className='resetButton'>Reset</Button>
      
    </div>
    <div className='p-5'>
      {demos.map((demo, index) => (<li key={index}>
        {demo.first_name} {demo.last_name} - {demo.status} 
        <Dropdown isOpen={dropdownOpen === demo.id} toggle={() => toggleDropDown(demo.id)} className='p-5'>
        <DropdownToggle caret>
          Select Status
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleStatusChange(demo.id,'to do')}>To Do</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(demo.id,'on deck')}>On Deck</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(demo.id,'complete')}>Complete</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        </li>
      ))}
    </div>
    </ul>
    </>
  )
}

export default Demo
