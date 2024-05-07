import axios from 'axios';
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Accountability = () => {

    const [attendance, setAttendance] = useState("");
    const [reason, setReason] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const firstName = localStorage.getItem('user_first_name');
    const lastName = localStorage.getItem('user_last_name');
    const token = localStorage.getItem('token');
    const cohort_name = localStorage.getItem('user_cohort');

    const requestData = {
        cohort_name: cohort_name,
        accountability_status: attendance === 'yes' ? 2 : 1,
        pair_status: attendance === 'yes' ? true : false,
        absence_reason: attendance === 'no' ? reason : ""
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (attendance === "no" && !reason) {
            setErrorMessage("Please provide a reason for absence");
            return;
        }
        try {
            let response = await axios.post("http://127.0.0.1:8000/accountability/record/", requestData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            setErrorMessage("");
            setSuccessMessage("Your attendance record has been submitted");
        } catch (error) {
            setErrorMessage("Error submitting attendance record");
            console.log(error);
        }
    };
    
    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h3 className="secondaryH3">Attendance Check In</h3>
            <Form style={{width: "300px", marginTop: "20px", marginBottom: "20px"}} onSubmit={handleSubmit}>
                    <Label for="name">Name:</Label>
                    <h4 className="mainH4">{firstName} {lastName}</h4>
                <FormGroup>
                    <Label for="attendance">Attending Class:</Label>
                    <Input type="select" name="attendance" id="attendance" value={attendance} onChange={(e) => setAttendance(e.target.value)}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </Input>
                </FormGroup>
                {attendance === 'no' &&
            
                <FormGroup>
                <Label for="exampleText">
                Reason for absence:
                </Label>
                <Input
                name="reason"
                type="textarea"
                id="reason" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                />
                </FormGroup>

                }
                {' '}
                <Button type="submit">Submit</Button>
            </Form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </>
    )
};

export default Accountability;
