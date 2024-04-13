// Home.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faSyringe, faHouseChimneyMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import healinghands from "../images/healinghands.png";
import healinghands2 from "../images/healinghands2.png";




function Home(props) {
    return (
        <div>
            <header className="jumbotron">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col className="text-center">
                            <Carousel interval={3000}>
                                <Carousel.Item>
                                    <img src={healinghands} className="carousel1" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={healinghands2} className="carousel2" />
                                </Carousel.Item>

                            </Carousel>
                            <br></br>
                            <br></br>
                            <Col>
                                <p className='p-header'>
                                    VitaLeaseHub enables early detection and proactive prevention of potential health issues, ensuring better chronic condition management.
                                </p>
                                <p className='p-header'>
                                    Experience enhanced overall wellness and foster stronger communication channels with healthcare professionals.
                                </p>
                                <p className='p-header'>
                                    Our platform is dedicated to helping individuals maintain optimal health, safeguarding against the escalation of serious medical concerns.
                                </p>
                            </Col>

                        </Col>
                    </Row>
                </Container>
            </header>

        </div>
    );
}

export default Home;