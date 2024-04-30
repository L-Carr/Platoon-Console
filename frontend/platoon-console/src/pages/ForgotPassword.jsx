import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const userData = {
                "email": email,
            };

            let response = await axios.post("https://127.0.0.1:8000/user/password-reset/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setErrorMessage("");
            setSuccessMessage("An email has been sent with password reset instructions");
            setEmail("");
            

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
                <h2 className="mainH2">Forgot Password?</h2>
                <span>Enter the email associated with your account</span>
                <Form style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }} onSubmit={handleSubmit}>
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
                    <Button type="Submit">Submit</Button>
                </Form>
                {successMessage ? (
                    <>
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    </>
                ) : (
                    <>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </>
                )}
            </div>
        </>
    )
};

export default ForgotPassword;