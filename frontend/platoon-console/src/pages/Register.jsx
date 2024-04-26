import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [cohortCode, setCohortCode] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const checkPassword = () => {
        return password !== verifyPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const userData = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone_number": phoneNumber,
                "cohort_code": cohortCode,
                "password": password
            };

            let response = await axios.post("https://127.0.0.1:8000/user/register/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token } = response.data;

            localStorage.setItem('token', token);

            setErrorMessage("");
            setSuccessMessage("Registration successful!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
            
            setTimeout(() => {
                navigate("/");
            }, 2000);

            console.log(response)

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                if (errorMessage && errorMessage.message === "User with this Email already exists.") {
                    setErrorMessage(errorMessage.message);
                } else {
                    console.log('Error', errorMessage);
                }
            } else {
                console.log('Error', error.message);
            }
        }
    };

    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className="mainH1">Register</h1>
                <Form style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input
                            id="exampleFirstName"
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label
                            for="exampleLastName"
                            hidden
                        >
                            Last Name
                        </Label>
                        <Input
                            id="exampleLastName"
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Input
                            id="examplePhoneNumber"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            type="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Input
                            id="exampleCohortCode"
                            name="cohortCode"
                            placeholder="Cohort Code"
                            type="text"
                            value={cohortCode}
                            onChange={(e) => setCohortCode(e.target.value)}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <p>Already have an account? <Link tag="link" to="/login">Log in</Link></p>
                    </>
                )}
            </div>
        </>
    )
};

export default Register;