import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const userData = {
                "email": email,
                "password": password
            };

            let response = await axios.post("http://127.0.0.1:8000/", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token, display_name } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('display_name', display_name);
            
            setErrorMessage("");
            setEmail("");
            setPassword("");
            
            navigate('/')
            
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
            <h1 className="mainH1">Login</h1>
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </>
    )
};

export default Login;