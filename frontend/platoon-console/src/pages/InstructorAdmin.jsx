import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const InstructorAdmin = () => {
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [ghConfigID, setGhConfigID] = useState(null);
  const [cohortCode, setCohortCode] = useState("");
  const [cohortName, setCohortName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");
  const [successCohort, setSuccessCohort] = useState(false)
  // const [resources, setResources] = useState([]); // State to store resources
  const [resourceName, setResourceName] = useState("");
  const [resourceProgram, setResourceProgram] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [resourceCohort, setResourceCohort] = useState("");
  const [allResources, setAllResources] = useState([]);



  const [errorGithubConf, setErrorGithubConf] = useState("");
  const [successGithubConf, setSuccessGithubConf] = useState("TEST");

  const [errorConfigCohort, setErrorConfigCohort] = useState("");
  const [successConfigCohort, setSuccessConfigCohort] = useState("");

  const [errorCreateLink, setErrorCreateLink] = useState("");
  const [successCreateLink, setSuccessCreateLink] = useState("");
  

  const [errorUpdateLink, setErrorUpdateLink] = useState("");
  const [successUpdateLink, setSuccessUpdateLink] = useState("");
  const configDataPut = async () => {
    try {
      const configData = {
        repo_owner: repoOwner,
        repo_name: repoName,
      };

      let response = await axios.put(
        `http://localhost:8000/gh/${ghConfigID}/`,
        configData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessGithubConf("Successfully Updated");
      }
      console.log(response.data);
    } catch (error) {
      setErrorGithubConf("Error Updating Configuration");
      if (error.response) {

      
        const errorMessage = error.response.data.error;
        console.log("Error", errorMessage);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (ghConfigID) {
      console.log("Already Configured");
      configDataPut();
      return "Already Configured";
    }

    try {
      const configData = {
        repo_owner: repoOwner,
        repo_name: repoName,
      };

      let response = await axios.post(
        "http://127.0.0.1:8000/gh/",
        configData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setGhConfigID(response.data.id);
      console.log(`THIS IS RESPONSE ID: ${response.data.id}`);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        console.log("Error", errorMessage);
      }
    }
  };
  const handleCohortSubmit = async (e) => {
    e.preventDefault();
    try {
      const configCohortData = {
        cohort_code: cohortCode,
        cohort_name: cohortName,
        start_date : startDate,
        end_date: endDate
      };
      
        let response = await axios.post(
          "http://127.0.0.1:8000/cohort/",
          configCohortData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      if (response.status === 201) {
        setSuccessCohort(true)
        setSuccessConfigCohort("Successfully Added Cohort")
        if (successCohort) {
         
          setCohortCode('')
          setCohortName('')
          setStartDate('')
          setEndDate('')
        }
      }
      console.log(response.data)
    } catch (error) {
      setErrorConfigCohort("Error Adding Cohort")
      console.log("Error", error);
    }
  }
  const getConfigLinks = async () => {
  
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/resources/",
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
          }
        }
      )

      setAllResources(response.data)
      console.log(`REPSONSE LINKS: ${response.data}`)
      console.log(`REPSONSE LINKS 2 : ${allResources}`)
      console.log(allResources)
    } catch (error) {
      console.log("Error", error);
    }
  };

  const configureLinkSubmit = async (e) => {

    e.preventDefault();
    try {
      const configLinkData = {
        resource_name: resourceName,
        program_name: resourceProgram,
        resource_link: resourceLink,
        cohort_name: resourceCohort
      };

      let response = await axios.post("http://127.0.0.1:8000/resources/", configLinkData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        setResourceName('')
        setResourceProgram('')
        setResourceLink('')
        setResourceCohort('')

        getConfigLinks();
        setSuccessCreateLink("Successfully Added Link")
      }
      console.log(response.data);
    } catch (error) {
      setErrorCreateLink("Error Adding Link")
      if (error) {
      
        console.log("Error", error);
      }
    }
  };

  const UpdateExistingLinks = async (record_id) => {

    let updatedResource = allResources.find((resource) => resource.id === record_id);
    console.log(updatedResource)
    try {
    

      let response = await axios.patch(`http://127.0.0.1:8000/resources/update/${record_id}/`, updatedResource, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {

      
        setSuccessUpdateLink("Successfully Updated Link")
        setTimeout(() => {
          setSuccessUpdateLink('');
        }, 3000);
  
      }
      console.log(response.data);
    } catch (error) {

      setErrorUpdateLink("Error Updating Link")
      if (error) {
      
        console.log("Error", error);
      }
    }
  };
  useEffect(() => {
    const initialConfigFetch = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/gh/all/", 
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            }
          }
        )
  
        if (response.data[0].id) {
          setGhConfigID(response.data[0].id)
          setRepoName(response.data[0].repo_name)
          setRepoOwner(response.data[0].repo_owner)
        } else {
          console.log('No Config File Found')
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
    initialConfigFetch();
    getConfigLinks();
  }, [])


  const updateRecord = (id, name, value, index) => {
    const updatedRecords = allResources.map((record, idx) => {
      // Determine whether to compare using id or index based on whether id is present
      const isTargetRecord = id ? record.id === id : idx === index;

      if (isTargetRecord) {
        return { ...record, [name]: value, isModified: true }; // Correctly updating the specified field
      }


      return record;
    });
    

    setAllResources(updatedRecords);
    console.log(allResources)// This should trigger a re-render with updated data
  };
  return (
    <Container>
      <h2 className="mainH2">Instructor Page</h2>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>
      <h4 className='text-black text-start'>Configure Universal GitHub Resources</h4>
      <Form onSubmit={handleFormSubmit}>
        <Row form>
          <Col md={5}>
            <FormGroup>
              <Input id="repoOwner" name="repoOwner" placeholder="Repo Owner" type="text" value={repoOwner} onChange={(e) => setRepoOwner(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Input id="repoName" name="repoName" placeholder="Repo Name" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button type="submit">Submit</Button>
            </Col>
            <div className="mt-3">
            {errorGithubConf && <p style={{ color: 'red' }}>{errorGithubConf}</p>}
              {successGithubConf && <p style={{ color: 'green' }}>{successGithubConf}</p>}
              </div>
        </Row>
        </Form>
      </Container>
      <div className="mt-5"></div>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>
      <h4 className="text-black text-start">Configure Cohorts</h4>
      <Form onSubmit={handleCohortSubmit}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Input id="cohortCode" name="cohortCode" placeholder="Cohort Code" type="text" value={cohortCode} onChange={(e) => setCohortCode(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Input id="cohortName" name="cohortName" placeholder="Cohort Name" type="text" value={cohortName} onChange={(e) => setCohortName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input id="startDate" name="startDate" placeholder="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input id="endDate" name="endDate" placeholder="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button type="submit">Add</Button>
            </Col>
            <div className="mt-3">
            {errorConfigCohort && <p style={{ color: 'red' }}>{errorConfigCohort}</p>}
              {successConfigCohort && <p style={{ color: 'green' }}>{successConfigCohort}</p>}
              </div>
        </Row>
        </Form>
      </Container>
      <div className="mt-5"></div>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>
      <h4 className="text-black text-start">Create Links</h4>

        
        <Form onSubmit={configureLinkSubmit}>
          
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Input id="resourceName" name="resourceName" placeholder="Resource Name" type="text" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input id="resourceProgram" name="programName" placeholder="Program Name" type="text" value={resourceProgram} onChange={(e) => setResourceProgram(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input id="resourceLink" name="resourceLink" placeholder="Resource Link" type="text" value={resourceLink} onChange={(e) => setResourceLink(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input id="resourceCohort" name="CohortName" placeholder="Cohort Name" type="text" value={resourceCohort} onChange={(e) => setResourceCohort(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={1}>
              <Button type="submit">add</Button>
            </Col>
            <div className="mt-3">
            {errorCreateLink && <p style={{ color: 'red' }}>{errorCreateLink}</p>}
              {successCreateLink && <p style={{ color: 'green' }}>{successCreateLink}</p>}
              </div>
          </Row>
        </Form>
      </Container>
      <div className="mt-5"></div>
      <Container style={{
      borderRadius: '15px', // Adjust the border radius as needed for roundness
      backgroundColor: 'white', // Sets the background color to white
      padding: '20px', // Adds some padding inside the div
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
      }}>
      <h4 className="text-black text-start">Link Management</h4>
      {allResources.map((resource, index) => (
          <Row key={index}>
            <Col md={3}>
               
 
              <Input className= "mt-3" id="resourceName" name="resourceName" placeholder="Resource Name" type="text" value={resource.resource_name}  onChange={(e) => updateRecord(resource.id, 'resource_name', e.target.value, index)}/>
          </Col>
         
            <Col md={3}>
               
              <Input className= "mt-3" id="programName" name="programName" placeholder="Program Name" type="text" value={resource.program_name} onChange={(e) => updateRecord(resource.id, 'program_name', e.target.value, index)}/>
               
          </Col>
         
            <Col md={3}>
               
              <Input className= "mt-3" id="resourceLink" name="resourceLink" placeholder="Resource Link" type="text" value={resource.resource_link}  onChange={(e) => updateRecord(resource.id, 'resource_link', e.target.value, index)}/>
              
          </Col>
          
            <Col md={3}>
                
              <Input  className= "mt-3" id="resourceLink" name="CohortName" placeholder="Cohort Name" type="text" value={resource.cohort_name} onChange={(e) => updateRecord(resource.id, 'cohort_name', e.target.value, index)} />
               
          </Col>
          
          <Col md={1} className="mt-3 mb-3">
              <Button onClick={() => UpdateExistingLinks(resource.id )}>update</Button>
          </Col>
         
          </Row>
      ))}
         <div className="mt-3">
            {errorUpdateLink && <p style={{ color: 'red' }}>{errorUpdateLink}</p>}
              {successUpdateLink && <p style={{ color: 'green' }}>{successUpdateLink}</p>}
              </div>
       
       
      </Container>
    </Container>
  );
};

export default InstructorAdmin;
