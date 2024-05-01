import axios from 'axios';
import {useState, useEffect} from 'react';

const Demo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [demos, setDemos] = useState([])

  const handleGetDemos = async (e) => {
    try {
      const userCohort = "Whiskey"

      let response = await axios.get(`https://127.0.0.1:8000/demo/all/${userCohort}/`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setDemos(response.data)
      console.log('Get Demos')
      console.log(await response.data)
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorMessage(errorMessage);
        console.log('Error', errorMessage);
      }
    }
  }

  useEffect(() => {
    handleGetDemos();
  }, [])


  return (
    <ul className="consoleCardUl">
      <li>Student - Status</li>
      {demos.map((demo, index) => <li key={index}>{demo.student} - {demo.status}</li>)}
    </ul>
  )
}

export default Demo