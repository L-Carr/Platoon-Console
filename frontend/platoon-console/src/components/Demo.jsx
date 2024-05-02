import axios from 'axios';
import {useState, useEffect} from 'react';
import { Button } from 'reactstrap';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [demos, setDemos] = useState([])
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
      showme = demos
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

  /*
  onClick method to hit endpoint: 
  https://127.0.0.1:8000/demo/student/<student_id>/
  use demo.student for id
  put request
  body: {"status":"update"}
  options: "on deck", "complete"
  display text with current status or button to update?
  */

  /*
  Instructor button:
  Reset all cohort demos:
  https://127.0.0.1:8000/demo/reset/<cohort_name>/
  use demo.cohort or whatever method is used to identify cohort
  will return a list of all students with updated statuses
  - does not include first names and last names
  */
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
    updateDemos("")
  } catch (error){
    console.error("Error resetting demo list:", error)
  }
 }

  return (
    <ul className="consoleCardUl">
      <li>Student - Status</li>
      <Button onClick={resetDemoList}className='resetButton'>Reset</Button>
      <hr />
      {demos.map((demo, index) => (<li key={index}>
        {demo.first_name} {demo.last_name} - {demo.status} ({demo.status === "On Deck" ? "On Deck" : "Complete"}) 
        {/* On Deck - Complete) */}
        </li>
      ))}
    </ul>
  )
}

export default Demo
