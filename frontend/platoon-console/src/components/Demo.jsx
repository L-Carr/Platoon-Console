import axios from 'axios';
import {useState, useEffect} from 'react';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [demos, setDemos] = useState([])

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


  return (
    <ul className="consoleCardUl">
      <li>Student - Status</li>
      {demos.map((demo, index) => <li key={index}>{demo.student} - {demo.status}</li>)}
    </ul>
  )
}

export default Demo