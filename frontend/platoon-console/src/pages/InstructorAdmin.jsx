import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const InstructorAdmin = () => {
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [ghConfigID, setGhConfigID] = useState(null);
  const [cohortCode, setCohortCode] = useState("");
  const [cohortName, setCohortName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");

  const configDataPut = async () => {
    try {
      const configData = {
        repo_owner: repoOwner,
        repo_name: repoName,
      };

      let response = await axios.put(
        `https://localhost:8000/gh/${ghConfigID}/`,
        configData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        console.log("Error", errorMessage);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (ghConfigID) {
      console.log("Already Configured");
      configDataPut();
      return "Already Configured";
    }

    try {
      const configData = {
        repo_owner: repoOwner,
        repo_name: repoName,
      };

      let response = await axios.post(
        "http://127.0.0.1:8000/gh/",
        configData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setGhConfigID(response.data.id);
      console.log(`THIS IS RESPONSE ID: ${response.data.id}`);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        console.log("Error", errorMessage);
      }
    }
  };

  useEffect(() => {
    const initialConfigFetch = async () => {
      try {
        let response = await axios.get(
          "https://127.0.0.1:8000/gh/all/", 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            }
          }
        )
  
        if (response.data[0].id) {
          setGhConfigID(response.data[0].id)
          setRepoName(response.data[0].repo_name)
          setRepoOwner(response.data[0].repo_owner)
        } else {
          console.log('No Config File Found')
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    initialConfigFetch();
  }, [])

  return (
    <Container>
      <h1>Instructor Page</h1>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>
      <h2 className='text-black text-start'>Configure GitHub Account</h2>
      <Form onSubmit={handleFormSubmit}>
        <Row form>
          <Col md={5}>
            <FormGroup>
              <Input id="repoOwner" name="repoOwner" placeholder="Repo Owner" type="text" value={repoOwner} onChange={(e) => setRepoOwner(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input id="repoName" name="repoName" placeholder="Repo Name" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
        </Form>
      </Container>
      <div className="mt-5"></div>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>
      <h2 className="text-black text-start">Configure Cohorts</h2>
      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Input id="cohortCode" name="cohortCode" placeholder="Cohort Code" type="text" value={cohortCode} onChange={(e) => setCohortCode(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Input id="cohortName" name="cohortName" placeholder="Cohort Name" type="text" value={cohortName} onChange={(e) => setCohortName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input id="startDate" name="startDate" placeholder="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input id="endDate" name="endDate" placeholder="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
        </Form>
        </Container>
    </Container>
  );
};

export default InstructorAdmin;
