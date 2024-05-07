import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, Button } from 'reactstrap';

const Github = () => {
    const [mainCurriculum, setMainCurriculum] = useState({});
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [weekCurriculum, setWeekCurriculum] = useState({});
    const [weekDropdownOpen, setWeekDropdownOpen] = useState(false);

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
            <ul className="consoleCardUl">
            {mainCurriculum.name ? 
            <>
                <li>
                    <Dropdown isOpen={weekDropdownOpen} toggle={toggleWeekDropdown} style={{ margin: "10px 10px 10px 10px" }}>
                        <DropdownToggle className="attendanceDropdown" caret>
                        {selectedWeek !== null ? `${selectedWeek}` : 'Select Week'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => { handleWeekSelect('Week 1'); toggleWeekDropdown(); }}>Week 1</DropdownItem>
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
                <li>week is not null</li>
                <li>{weekCurriculum.week_name}</li>
                {/* <li>{weekCurriculum.week_html_url} */}
            </>
            :
            <>
                <li>week is null</li>
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
        </>
    )
}

export default Github