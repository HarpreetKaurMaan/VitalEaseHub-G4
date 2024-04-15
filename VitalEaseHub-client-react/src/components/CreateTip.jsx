import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_TIP = gql`
    mutation CreateTip(
        $title: String!
        $description: String!
    ) {
        createTip(
            title: $title
            description: $description
        ) {
            title
            description
        }
    }
`;

function CreateTip() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [createTipMutation] = useMutation(CREATE_TIP);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError('Please fill out all fields');
            return;
        }

        setLoading(true);
        try {
            await createTipMutation({
                variables: {
                    title,
                    description
                }
            });
            alert('Tip created successfully');
            navigate('/tips'); // Redirect to tip list page
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            )}

            {error && <div className="text-danger">{error}</div>}
        </Form>
    );
}

export default CreateTip;
