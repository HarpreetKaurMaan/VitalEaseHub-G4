import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const CREATE_ALERT = gql`
    mutation CreateAlert(
        $responderName: String!
        $email: String!
        $phoneNumber: String!
        $patientName: String!
        $address: String!
        $message: String!
    ) { 
        createAlert(
            responderName: $responderName
            email: $email
            phoneNumber: $phoneNumber
            patientName: $patientName
            address: $address
            message: $message
        ) {
            responderName
            email
            phoneNumber
            patientName
            address
            message
        }
    }
`;

function CreateAlert() {
    const navigate = useNavigate();
    const [responderName, setResponderName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [patientName, setPatientName] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [createAlert, { loading, error }] = useMutation(CREATE_ALERT);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!responderName || !email || !phoneNumber || !patientName || !address || !message) {
            alert('Please fill out all fields');
            return;
        }
        createAlert({
            variables: {
                responderName,
                email,
                phoneNumber,
                patientName,
                address,
                message
            }
        }).then(() => {
            alert('Alert created successfully');
            navigate('/');
        }).catch((error) => {
            alert(`Submission error! ${error.message}`);
        });
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Container maxWidth="xs">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Responder Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={responderName}
                        onChange={(e) => setResponderName(e.target.value)}
                        placeholder="Enter responder name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                    />
                </Form.Group>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </Form>
        </Container>
    );
}

export default CreateAlert;
