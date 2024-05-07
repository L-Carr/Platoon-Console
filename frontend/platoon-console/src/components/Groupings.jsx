import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

const Groupings = () => {
  const [students, setStudents] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("token");
  const now = new Date().toISOString().split("T")[0];

  // const generateFakeStudents = (num) => {
  //   const fakeStudents = [];
  //   const cohortName = "Whiskey";
  //   const accountabilityDate = new Date().toISOString().split("T")[0];

  //   for (let i = 1; i <= num; i++) {
  //     fakeStudents.push({
  //       id: i,
  //       first_name: `Student${i}`,
  //       last_name: `Last${i}`,
  //       cohort_name: cohortName,
  //       accountability_date: accountabilityDate,
  //       pair_status: true, // Randomly assign pairing status
  //     });
  //   }

  //   return fakeStudents;
  // };

  // useEffect(() => {
  //   const fakeStudents = generateFakeStudents(50); // Adjust as needed
  //   setStudents(fakeStudents);
  // }, []);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cohort/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        setCohorts(data);
      } catch (error) {
        console.error("Failed to fetch cohorts", error);
      }
    };

    fetchCohorts();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCohort) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/accountability/retrieve/?cohort_name=${selectedCohort}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data;
        const filteredStudents = data.filter(
          (stud) => stud.accountability_date === now && stud.pair_status
        );

        setStudents(filteredStudents);
      } catch (error) {
        if (error.response.status === 404) {
          alert("NO ATTENDANCE RECORDS AVAILABLE FOR THE DAY.");
        }
        console.error("Failed to fetch students", error);
      }
    };
    fetchStudents();
  }, [selectedCohort]);

  const handleGroupSizeChange = (e) => {
    setGroupSize(parseInt(e.target.value, 10));
  };

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const createGroups = () => {
    const shuffleStudents = [...students];
    shuffleArray(shuffleStudents);

    const newGroups = [];
    for (let i = 0; i < shuffleStudents.length; i += groupSize) {
      newGroups.push(shuffleStudents.slice(i, i + groupSize));
    }

    const lastGroup = newGroups[newGroups.length - 1];
    if (lastGroup && lastGroup.length < groupSize) {
      newGroups.pop();
      lastGroup.forEach((student) => {
        for (let i = 0; i < newGroups.length; i++) {
          if (newGroups[i].length < groupSize + 1) {
            newGroups[i].push(student);
            break;
          }
        }
      });
    }

    setGroups(newGroups);
  };

  const copyToClipboard = () => {
    const formattedText = groups
      .map(
        (group, idx) =>
          `Group ${idx + 1}: ${group
            .map((stud) => `${stud.first_name} ${stud.last_name}`)
            .join(", ")}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(formattedText)
      .then(() => alert("Copied to clipboard successfully!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div>
      <h2 className="mainH2">Generate Groups</h2>
      <FormGroup>
        <Label for="cohortSelect">Select Cohort:</Label>
        <Input
          style={{ width: "300px", margin: "0 auto", textAlign: "center" }}
          type="select"
          id="cohortSelect"
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
        >
          <option value="">-- Select a Cohort --</option>
          {cohorts.map((cohort, index) => (
            <option key={index} value={cohort.cohort_name}>
              {cohort.cohort_name}
            </option>
          ))}
        </Input>
      </FormGroup>
      Students per group:
      <Input
        style={{ width: "100px", margin: "0 auto", textAlign: "center" }}
        type="number"
        value={groupSize}
        onChange={handleGroupSizeChange}
        placeholder="Enter group size"
        min={1}
      ></Input>
      <Button style={{ margin: "10px" }} onClick={createGroups}>
        Create Groups
      </Button>
      <Button onClick={copyToClipboard}>Copy Groups</Button>
      <div
        className="card-container"
        style={{
          marginTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {groups.map((group, idx) => (
          <Card key={idx} className="groupCard">
            <CardBody>
              <CardTitle>
                <h3 className="mainH3">Group {idx + 1}</h3>
              </CardTitle>
              <ul className="consoleCardUl">
                {group.map((stud) => (
                  <li key={stud.id}>
                    {stud.first_name} {stud.last_name}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Groupings;
