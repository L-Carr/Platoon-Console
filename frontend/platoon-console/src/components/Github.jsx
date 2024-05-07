import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, Button } from 'reactstrap';

const Github = () => {
    const [mainCurriculum, setMainCurriculum] = useState({});
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [weekCurriculum, setWeekCurriculum] = useState({});
    const [weekDropdownOpen, setWeekDropdownOpen] = useState(false);

    const WEEKS = [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
        'Week 7',
        'Week 8',
        'Week 9',
    ]

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    }

    const formatWeek = (str) => {
        return str.replace(/week /i, '');
    }

    const getCurrUrl = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/gh/main/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setMainCurriculum(response.data)


        } catch (error) {
            alert('No GitHub repository configured')
            console.error('Error fetching main url', error)
        }
    }

    const getWeekUrl = async (week) => {
        try {
            const formattedWeek = formatWeek(week)
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/gh/week/${formattedWeek}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWeekCurriculum(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching week url', error)
        }
    }

    const toggleWeekDropdown = () => setWeekDropdownOpen(prevState => ! prevState);

    const handleWeekSelect = async (name) => {
        setSelectedWeek(name);
        setWeekDropdownOpen(false);
    }

useEffect(() => {
    getCurrUrl();
}, []);

useEffect(() => {
    if (selectedWeek) {
        getWeekUrl(selectedWeek)
    }
}, [selectedWeek]);


    return (
        <>  
            <card className="gitHubCard2">
            <ul className="consoleCardUl">
            {mainCurriculum.name ? 
            <>
                <li>
                    <Dropdown isOpen={weekDropdownOpen} toggle={toggleWeekDropdown} style={{marginBottom: "10px"}}>
                        <DropdownToggle className="attendanceDropdown" style={{backgroundColor: "#2f2f2f", border: "0px", height: "30px"}}caret>
                        {selectedWeek !== null ? `${selectedWeek}` : 'Select Week'}
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            {/* <DropdownItem onClick={() => { handleWeekSelect('Week 1'); toggleWeekDropdown(); }}>Week 1</DropdownItem> */}
                            {WEEKS.map( name => (
                                <DropdownItem key={name} onClick={() => {
                                    handleWeekSelect(name); toggleWeekDropdown(); }}>
                                        {name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </li>
                <li>
                    <Link
                    to={mainCurriculum.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {toTitleCase(mainCurriculum.name)}
                    </Link>
                </li>

            </>
            : <></>
            }
            {selectedWeek !== null ?
            <>
                <li>
                    <Link
                    to={weekCurriculum.week_html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {`Week: ${weekCurriculum.week_name}`}
                    </Link>
                </li>
                {weekCurriculum.topics ?
                <>
                {weekCurriculum.topics.map((topic, index) => (
                    <li key={index}>
                        <Link
                        to={topic.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        {`Topic: ${topic.topic_name}`}
                        </Link>
                    </li>
                ))}
                </>
                :
                <></>
            }
            </>
            :
            <>
            </>
            }
            <li>
                <Link
                to="https://github.com/Code-Platoon-Curriculum/whiskey-demos-and-notes"
                target="_blank"
                rel="noopener noreferrer"
                >
                Demos & Notes
                </Link>
            </li>
            <li>
                <Link
                to="https://github.com/Code-Platoon-Assignments/"
                target="_blank"
                rel="noopener noreferrer"
                >
                Assignments
                </Link>
            </li>
            </ul>
            </card>
        </>
    )
}

export default Github