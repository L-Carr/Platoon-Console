import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { uidb64 } = useParams();
  const { token } = useParams();

  const checkPassword = () => {
    return newPassword !== verifyPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!newPassword) {
      setErrorMessage("Please enter a valid password.");
      return;
    }

    try {
      const userData = {
        new_password: newPassword,
      };

      // Split token by '-'
      const tokenPart = token.split("-")[1];
      console.log(tokenPart);
      console.log(uidb64);

      let response = await axios.put(
        `http://127.0.0.1:8000/user/password-reset/${uidb64}/${token}/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            token: tokenPart, // Set tokenPart as the value of 'token' header
          },
        }
      );
      console.log(response);

      setErrorMessage("");
      setSuccessMessage(response.data.message);
      setNewPassword("");
      setVerifyPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
      } else {
        console.log("Error", errorMessage);
      }
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
        <h2 className="mainH2">Change Password</h2>
        <Form
          style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Input
              id="exampleNewPassword"
              name="newPassword"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setErrorMessage(""), setNewPassword(e.target.value);
              }}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="exampleVerifyPassword"
              name="verifyPassword"
              placeholder="Verify Password"
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </FormGroup>{" "}
          <Button type="Submit" disabled={checkPassword()}>
            Submit
          </Button>
        </Form>
        {successMessage ? (
          <>
            <p style={{ color: "green" }}>{successMessage}</p>
          </>
        ) : (
          <>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {checkPassword() && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
