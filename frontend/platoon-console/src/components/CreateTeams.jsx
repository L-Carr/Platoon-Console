import { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Link } from 'react-router-dom';

function CreateTeamComponent() {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const postData = {
      name: teamName,
      description: description,
      cohort: cohortId
    };
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8000/teams/create/', postData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (response.status === 201) {
        setSuccess('Team created successfully!');
        setError('');
        // Clear form fields
        setTeamName('');
        setDescription('');
        setCohortId('');
      }
    } catch (err) {
      setError('Failed to create team. ' + (err.response?.data?.message || err.message));
      setSuccess('');
    }
  };

  return (
    <>
      <div
        className="card-container"
        style={{
          marginTop: "2rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="mainH2">Create Team</h2>
        <Form
          style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }}
          onSubmit={handleCreateTeam}
        >
          <FormGroup>
            <Input
              id="teamName"
              name="teamName"
              placeholder="Team Name"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="cohortId"
              name="cohortId"
              placeholder="Cohort ID"
              type="number"
              value={cohortId}
              onChange={(e) => setCohortId(e.target.value)}
            />
          </FormGroup>{" "}
          <Button type="submit">
            Create Team
          </Button>
        </Form>
        {success ? (
          <p style={{ color: "green" }}>{success}</p>
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </div>
    </>
  );
}

export default CreateTeamComponent;
