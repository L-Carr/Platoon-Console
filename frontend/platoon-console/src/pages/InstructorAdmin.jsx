import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const InstructorAdmin = () => {
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [ghConfigID, setGhConfigID] = useState(null);
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
        // setErrorMessage(errorMessage);
        console.log("Error", errorMessage);
      }
    }
  };
  
  const handleFormSubmit = async (e) => {
    // If Configured once, and changes needed, it will call the PUT Method
    e.preventDefault();
    
    if (ghConfigID) {
      console.log("Already Configured");
      /// gh/ID

    

      configDataPut();
      return "Already Configured";
    }

   

    try {
      const configData = {
        repo_owner: repoOwner,
        repo_name: repoName,
      };

      let response = await axios.post(
        "https://127.0.0.1:8000/gh/",
        configData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(` THIS IS RESPONSE ID: ${response.data.id}`)
      setGhConfigID(response.data.id);

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        // setErrorMessage(errorMessage);
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

          console.log(`ID on inital fetch ${response.data[0].id}`)
          setGhConfigID(response.data[0].id)
          setRepoName(response.data[0].repo_name)
          setRepoOwner(response.data[0].repo_owner)
          console.log(response.data[0].id)
        } else {

          console.log('No Config File Found')
        }
      } catch (error) {

        console.log("Error", error);
      }
    }

    initialConfigFetch();

  }, []
  )
  return (
    <div className="">
      <h1>Instructor Page</h1>
      <Form
        className="col"
        // style={{ width: "300px", marginTop: "20px", marginBottom: "20px" }}
        onSubmit={handleFormSubmit}
      >
        <div className="container">
          <div className="row">
            <FormGroup>
              <Label for="repoOwner" hidden>
                Repo Owner
              </Label>
              <Input
                id="repoOwner"
                name="repoOwner"
                placeholder="Repo Owner"
                type="text"
                value={repoOwner}
                onChange={(e) => setRepoOwner(e.target.value)}
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="repoName" hidden>
                Repo Name
              </Label>
              <Input
                id="repoName"
                name="repoName"
                placeholder="Repo Name"
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </FormGroup>{" "}
          </div>
        </div>
        <Button type="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default InstructorAdmin;
