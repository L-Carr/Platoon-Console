import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { uuid64 } = useParams();
    const { token } = useParams();

    const checkPassword = () => {
        return newPassword !== verifyPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const userData = {
                "new_password": newPassword
            };

            let response = await axios.post(`http://127.0.0.1:8000/user/password-reset/${uuid64}/${token}/`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const { token } = response.data;

            localStorage.setItem('token', token);

            setErrorMessage("");
            setSuccessMessage("Password updated successfully!");
            setNewPassword("");
            setVerifyPassword("");
            
            setTimeout(() => {
                navigate("login/");
            }, 2000);

            console.log(response)

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(errorMessage.message);
                } else {
                    console.log('Error', errorMessage);
                }
        }
    };

    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 className="mainH2">Change Password</h2>
                <Form style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input
                            id="exampleNewPassword"
                            name="newPassword"
                            placeholder="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Input
                            id="exampleVerifyPassword"
                            name="verifyPassword"
                            placeholder="Verify Password"
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <Button type="Submit" disabled={checkPassword()}>Submit</Button>
                </Form>
                {successMessage ? (
                    <>
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    </>
                ) : (
                    <>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {checkPassword() && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                    </>
                )}
            </div>
        </>
    )
};

export default ChangePassword;