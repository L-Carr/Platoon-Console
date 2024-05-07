import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  CardText,
} from "reactstrap";
import Accountability from "../components/Accountability";
import Demo from "../components/Demo";

const Homepage = () => {
  const [accountabilityModalOpen, setAccountabilityModalOpen] = useState(false);
  const [agendaModalOpen, setAgendaModalOpen] = useState(false);
  const [monthlyModalOpen, setMonthlyModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const toggleAccountabilityModal = () => {
    setAccountabilityModalOpen(!accountabilityModalOpen);
  };

  const toggleAgendaModal = () => {
    setAgendaModalOpen(!agendaModalOpen);
  };

  const toggleMonthlyModal = () => {
    setMonthlyModalOpen(!monthlyModalOpen);
  };

  const toggleFeedbackModal = () => {
    setFeedbackModalOpen(!feedbackModalOpen);
  };

  return (
    <>
      <h2 className="mainH2">Platoon Console</h2>
      <div
        style={{
          backgroundColor: "#1d1d1d",
          padding: "1rem",
          maxWidth: "85%",
          margin: "0 auto",
          marginTop: "2rem",
          marginBottom: "2rem",
          borderRadius: "10px",
        }}
      >
        <div
          className="card-container"
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card className="consoleCard">
            <CardBody>
              <CardTitle style={{ marginBottom: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Daily Tasks</h3>
                </div>
              </CardTitle>
              <ul className="consoleCardUl">
                <li>
                  <Link onClick={toggleAccountabilityModal}>
                    Attendance Check In
                  </Link>
                </li>
                <li>
                  <Link onClick={toggleFeedbackModal}>Daily Feedback Form</Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="consoleCard">
            <CardBody>
              <CardTitle style={{ marginBottom: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Calendar</h3>
                </div>
              </CardTitle>
              <ul className="consoleCardUl">
                <li>
                  <Link onClick={toggleAgendaModal}>Daily Agenda</Link>
                </li>
                <li>
                  <Link onClick={toggleMonthlyModal}>Monthly Schedule</Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="consoleCard">
            <CardBody>
              <CardTitle style={{ marginBottom: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>GitHub</h3>
                </div>
              </CardTitle>
              <ul className="consoleCardUl">
                <li>
                  <Link
                    to="http://github.com/Code-Platoon-Curriculum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link
                    to="http://github.com/Code-Platoon-Curriculum/whiskey-demos-and-notes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demos & Notes
                  </Link>
                </li>
                <li>
                  <Link
                    to="http://github.com/Code-Platoon-Assignments/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Assignments
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="consoleCard">
            <CardBody>
              <CardTitle style={{ marginBottom: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Pairs & Demos</h3>
                </div>
              </CardTitle>
              <ul className="consoleCardUl">
                <li>
                  <Link to="groups/">Generate Pairs</Link>
                </li>
                <li>
                  <Link to="demo/">Generate Demo List</Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="consoleCard">
            <CardBody>
              <CardTitle style={{ marginBottom: "0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Resources</h3>
                </div>
              </CardTitle>
              <ul className="consoleCardUl">
                <li>
                  <Link to="videos/">YouTube Playlist</Link>
                </li>
                <li>
                  <Link to="canvas/">Platoon Canvas</Link>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={accountabilityModalOpen}
        toggle={toggleAccountabilityModal}
        size="xl"
        style={{ maxWidth: "500px" }}
      >
        <ModalHeader
          toggle={toggleAccountabilityModal}
          style={{ backgroundColor: "#3b7f82" }}
        />
        <ModalBody style={{ backgroundColor: "#2f2f2f" }}>
          <Accountability />
        </ModalBody>
      </Modal>

      <Modal isOpen={feedbackModalOpen} toggle={toggleFeedbackModal} size="xl">
        <ModalHeader
          toggle={toggleFeedbackModal}
          style={{ backgroundColor: "#3b7f82" }}
        />
        <ModalBody style={{ backgroundColor: "#2f2f2f" }}>
          <iframe
            title="Daily Feedback"
            src="http://share.hsforms.com/1I02qHVEvRlOEs5ggeJPU8Ap8bb6"
            style={{ width: "100%", height: "100vw", border: "none" }}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={agendaModalOpen} toggle={toggleAgendaModal} size="md">
        <ModalHeader
          toggle={toggleAgendaModal}
          style={{ backgroundColor: "#3b7f82" }}
        />
        <ModalBody style={{ backgroundColor: "#2f2f2f" }}>
          <iframe
            title="Calendar"
            src="http://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&mode=AGENDA&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTitle=0&showTz=0&showDate=0&src=Y184NDY4MjI3MDQ0YzQ1MGEyYTZlN2YwNDdkMzEwZTcwYWU3YTA5NGJlMzg4ZjJhYTY1Y2M4NzJkOTRhNDcyYTgxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%238E24AA"
            style={{ width: "100%", height: "250px", border: "none" }}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={monthlyModalOpen} toggle={toggleMonthlyModal} size="xl">
        <ModalHeader
          toggle={toggleMonthlyModal}
          style={{ backgroundColor: "#3b7f82" }}
        />
        <ModalBody style={{ backgroundColor: "#2f2f2f" }}>
          <iframe
            title="Calendar"
            src="http://calendar.google.com/calendar/embed?src=c_8468227044c450a2a6e7f047d310e70ae7a094be388f2aa65cc872d94a472a81%40group.calendar.google.com&ctz=America%2FNew_York"
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Homepage;
