import axios from 'axios';
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const userData = {
                "username": email,
                "password": password
            };

            let response = await axios.post("https://127.0.0.1:8000/user/login/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            const { token, user_cohort, user_first_name, user_last_name, user_groups } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user_cohort', user_cohort);
            localStorage.setItem('user_first_name', user_first_name);
            localStorage.setItem('user_last_name', user_last_name);
            localStorage.setItem('user_groups', user_groups)

            
            setErrorMessage("");
            setEmail("");
            setPassword("");
            setSuccessMessage("Login successful");
            
            setTimeout(() => {
                navigate("/");
            }, 2000);
            // window.location.href = '/';
            
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                setErrorMessage(errorMessage);
                console.log('Error', errorMessage);
                } 
        }
    };
    
    return (
        <>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2 className="mainH2">Login</h2>
            <Form style={{width: "300px", marginTop: "20px", marginBottom: "20px"}} onSubmit={handleSubmit}>
                <FormGroup>
                    <Label
                        for="exampleEmail"
                        hidden
                        >
                        Email
                    </Label>
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
                    <Label
                        for="examplePassword"
                        hidden
                        >
                        Password
                    </Label>
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
                <Button type="Submit">Submit</Button>
            </Form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage.error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <p>Don't have an account?  <Link tag="link" to="/register">Register</Link></p>
            <p><Link tag="link" to="/forgot-password">Forgot password?</Link></p>
            </div>
        </>
    )
};

export default Login;