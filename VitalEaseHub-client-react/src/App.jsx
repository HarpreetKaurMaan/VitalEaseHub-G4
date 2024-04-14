import React, { useState, Fragment, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';
import {
  faAddressCard,
  faBell,
  faComment,
  faDumbbell,
  faHospitalUser,
  faHouse,
  faUser,
  faVial,
  faVialCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserProfile from "./components/User";
import CreateVital from "./components/CreateVital";
import NurseVitalInfo from "./components/NurseVitalInfo";
import CreateTip from "./components/CreateTip";
import VitalList from "./components/VitalList";
import TipList from "./components/TipList";
import EditVital from "./components/EditVital";
import EditTip from "./components/EditTip";
import CreateAlert from "./components/CreateAlert";
import CreateSymptom from "./components/CreateSymptom";
import AlertList from "./components/AlertList";
import Game from "./components/Game";
import Patients from "./components/Patients";
import UserVitals from "./components/UserVitals";
import {
  useAuthToken,
  useAuthUserToken,
  useAuthRole,
  useLogout,
} from "./auth/auth";

function App() {
  const PAYLOAD = gql`
    query Payload {
      payload {
        _id
        email
        role
      }
    }
  `;

  const LOGOUT_USER = gql`
    mutation logOut {
      logOut
    }
  `;

  const [logoutUser] = useMutation(LOGOUT_USER);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authToken] = useAuthToken();
  const [authUserToken] = useAuthUserToken();
  const [authRole] = useAuthRole();

  useEffect(() => {
    if (authToken) {
      setCurrentUser(authUserToken);
    }
  }, [authToken, authUserToken]);

  const NurseProtectedRoute = ({ children }) => {
    if (!isNurse()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RedirectHomeRoute = ({ children }) => {
    if (isLoggedIn()) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  const { loading, error, data } = useQuery(PAYLOAD, {
    onCompleted: (data) => {
      console.log(data.payload);
      setRole(data.payload.role);
      setEmail(data.payload.email);
      sessionStorage.setItem("user_id", data.payload._id);
      sessionStorage.setItem("email", data.payload.email);
    },
  });

  const logout = () => {
    logoutUser()
      .then(() => {
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const isLoggedIn = () => {
    return (
      sessionStorage.getItem("email") !== undefined &&
      sessionStorage.getItem("email") !== "" &&
      sessionStorage.getItem("email") !== null
    );
  };

  const isNurse = () => {
    return isLoggedIn() && sessionStorage.getItem("role") === "nurse";
  };

  const user_email = sessionStorage.getItem("email");
  const fullName = sessionStorage.getItem("fullName");
  const user_role = sessionStorage.getItem("role");

  return (
    <div>
      <>
        <Router>
          <Navbar className="bg-body-primary" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">
                <img
                  src="vital-ease-logo.png"
                  width="50" // Remove "px" since width attribute doesn't require units
                  height="70" // Set height to auto to maintain aspect ratio
                  className="d-inline-block align-top"
                  alt="Logo"
                  style={{ objectFit: 'contain' }} // Ensure the image fits well within the dimensions
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="justify-content-end">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/home">
                    <FontAwesomeIcon icon={faHouse} /> Home
                  </Nav.Link>
                  {!isLoggedIn() ? (
                    <Fragment>
                      <Nav.Link as={Link} to="/register">
                        <FontAwesomeIcon icon={faAddressCard} /> Register
                      </Nav.Link>
                      <Nav.Link as={Link} to="/login">
                        <FontAwesomeIcon icon={faUser} /> Login
                      </Nav.Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {isNurse() ? (
                        <Fragment>
                          <Nav.Link as={Link} to="/add-tip">
                            {" "}
                            <FontAwesomeIcon icon={faComment} /> Create Tip
                          </Nav.Link>
                          <Nav.Link as={Link} to="/add-vitals">
                            {" "}
                            <FontAwesomeIcon icon={faVial} /> Create Vitals
                          </Nav.Link>
                          <Nav.Link as={Link} to="/patients">
                            {" "}
                            <FontAwesomeIcon icon={faHospitalUser} /> Patients
                          </Nav.Link>
                          <Nav.Link as={Link} to="/alerts">
                            {" "}
                            <FontAwesomeIcon icon={faBell} /> Alerts
                          </Nav.Link>
                          <Nav.Link as={Link} to="/vitals">
                            {" "}
                            <FontAwesomeIcon icon={faVial} /> Vitals
                          </Nav.Link>
                          <Nav.Link as={Link} to="/tips">
                            {" "}
                            <FontAwesomeIcon icon={faComment} /> Tips
                          </Nav.Link>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Nav.Link as={Link} to="/add-vitals">
                            {" "}
                            <FontAwesomeIcon icon={faVial} /> Submit Vitals
                          </Nav.Link>
                          <Nav.Link as={Link} to="/add-alert">
                            {" "}
                            <FontAwesomeIcon icon={faBell} /> Submit Alert
                          </Nav.Link>
                          <Nav.Link as={Link} to="/tips">
                            {" "}
                            <FontAwesomeIcon icon={faComment} /> Tip List
                          </Nav.Link>
                          <Nav.Link as={Link} to="/symptoms">
                            {" "}
                            <FontAwesomeIcon icon={faBell} /> Create Symptoms
                          </Nav.Link>
                          <Nav.Link as={Link} to="/fitness">
                            {" "}
                            <FontAwesomeIcon icon={faDumbbell} /> Fitness
                          </Nav.Link>
                          <Nav.Link as={Link} to="/vitals-patient">
                            {" "}
                            <FontAwesomeIcon icon={faVial} /> View Vitals
                          </Nav.Link>
                        </Fragment>
                      )}
                      <div
                        className={`nav-link`}
                        style={{ cursor: "pointer" }}
                        onClick={() => logout()}
                      >
                        {" "}
                        Logout {fullName} ({user_role}){" "}
                      </div>
                    </Fragment>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-vitals" element={<CreateVital />} />
              <Route path="/vitals" element={<VitalList />} />
              <Route path="/edit-vital/:id" element={<EditVital />} />
              <Route path="/add-tip" element={<CreateTip />} />
              <Route path="/tips" element={<TipList />} />
              <Route path="/edit-tip/:id" element={<EditTip />} />
              <Route path="/add-alert" element={<CreateAlert />} />
              <Route path="/alerts" element={<AlertList />} />
              <Route path="/symptoms" element={<CreateSymptom />} />
              <Route path="/fitness" element={<Game />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/vitals-patient" element={<UserVitals />} />
              <Route
                path="/vitals/:firstName/:lastName"
                element={<NurseVitalInfo />}
              />
              <Route path="/add-covid" element={<CreateSymptom />} />
              <Route
                path="/create/record/:patientIdnew"
                element={<CreateVital nurseId={data} />}
              />
            </Routes>
          </Container>

          <div className="footer">
          WellnessWeb &copy;{new Date().getFullYear()} 
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;
