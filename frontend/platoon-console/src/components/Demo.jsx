import axios from 'axios';
import {useState, useEffect} from 'react';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [demos, setDemos] = useState([])

  // How is cohort being tracked here?
  // For student? (easy, included in endpoint)
  // For instructor?

  const updateDemos = async (e) => {
    // Uses a post request to check with backend and create records for any student who does not have a demo record, gets current updated list of all demo records
    try {
      const userCohort = "Whiskey"

      let response = await axios.post(`https://127.0.0.1:8000/demo/all/${userCohort}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Update Demos')
      console.log(await response.data)
      setDemos(await response.data)
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

  return (
    <ul className="consoleCardUl">
      <li>Student - Status</li>
      <hr />
      {demos.map((demo, index) => <li key={index}>{demo.first_name} {demo.last_name} - {demo.status} (On Deck - Complete)</li>)}
    </ul>
  )
}

export default Demo