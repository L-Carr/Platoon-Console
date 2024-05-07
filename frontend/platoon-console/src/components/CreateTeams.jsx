import { useState } from 'react';
import axios from 'axios';

function CreateTeamComponent() {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateTeam = async () => {
    const postData = {
      name: teamName,
      description: description,
      cohort: cohortId
    };
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8000/teams/create/', postData, {
        headers: {
            'Authorization': `Token ${token}`}
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
    <div>
      <h2>Create Team</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <label>
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Cohort ID:
        <input
          type="number"
          value={cohortId}
          onChange={e => setCohortId(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCreateTeam}>Create Team</button>
    </div>
  );
}

export default CreateTeamComponent;
