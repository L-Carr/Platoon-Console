import React, { useState, useEffect } from "react";

const Groupings = () => {
  const [students, setStudents] = useState([]);
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/mocks/studentData.json");
        if (!response.ok) {
          throw Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };
    fetchStudents();
  }, []);

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
    setGroups(newGroups);
  };

  const copyToClipboard = () => {
    const formattedText = groups
      .map(
        (group, idx) =>
          `Group ${idx + 1}: ${group
            .map((stud) => `${stud.first} ${stud.last}`)
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
      <input
        type="number"
        value={groupSize}
        onChange={handleGroupSizeChange}
        placeholder="Enter group size"
        min={1}
      ></input>
      <button onClick={createGroups}>Create Groups</button>
      <button onClick={copyToClipboard}>Copy Groups</button>
      {groups.map((group, idx) => (
        <div key={idx}>
          <h2>Group {idx + 1}</h2>
          {group.map((stud) => (
            <p key={stud.id}>
              {stud.first} {stud.last}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Groupings;
