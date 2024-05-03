import axios from 'axios';
import {useState, useEffect} from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [demos, setDemos] = useState([])
  const [nextStudent, setNextStudent] = useState("")
  const [studentId, setStudentId] = useState(0)
  const [newStatus, setNewStatus] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState('Online');

  // const showme = ""

  // How is cohort being tracked here?
  // For student? (easy, included in endpoint)
  // For instructor?

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
      console.log(response)
      setDemos(response.data)
      setNextStudent(response.data)
      // setStudentId(response.data[0])
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
      console.log(nextStudent)
      if (demos.length > 0) {
        setStudentId(demos[0].student)
        console.log(studentId)
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
  // console.log(studentId)
  const updateDemoStatus = async (studentId, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      // console.log(nextStudent)
      // if (demos.length > 0) {
      //   setStudentId(demos[0].student)
      //   console.log(studentId)
      // }
      // const studentId = 1
      const response = await axios.put(`https://127.0.0.1:8000/demo/student/${studentId}/`, {status: newStatus}, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      updateDemos()
      // setNewStatus("")
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

  //this reset function is working, actually setting all statuses back to to do*********
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

 const toggleDropDown = ({ status }) => {
  setDropdownOpen(!dropdownOpen)
 }

 const handleStatusChange = async ({ studentId, newStatus }) => {
  // const selectedStatus = e.target.value
  // setNewStatus(selectedStatus)
  // console.log(newStatus)
  console.log("Status updated to: " + selectedStatus);
  // setSelectedStatus(newStatus)
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
        <h6>{nextStudent.first_name} {nextStudent.last_name}</h6>
      </div>
    )}
    <div className='p-4'>

      <li>Student - Status</li>
      <Button onClick={resetDemoList}className='resetButton'>Reset</Button>
      
    </div>
      
    <div className='p-5'>
    <p>Status: {status}</p>
      {demos.map((demo, index) => (<li key={index}>
        {demo.first_name} {demo.last_name} - 
        {demo.status} 
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} className='p-5'>
        <DropdownToggle caret>
          {selectedStatus ? selectedStatus : 'Select Status'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleStatusChange(studentId,'to do')}>To Do</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(studentId,'on deck')}>On Deck</DropdownItem>
          <DropdownItem onClick={() => handleStatusChange(studentId,'complete')}>Complete</DropdownItem>
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
