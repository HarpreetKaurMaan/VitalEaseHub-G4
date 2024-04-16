import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "@mui/material/Button";

const GET_USERS = gql`
  query GetPatients {
    patients {
      _id
      firstName
      lastName
      email
      password
      address
      city
      province
      postalCode
      phone
      role
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($id: String!) {
    deleteUser(id: $id) {
      _id
    }
  }
`;

function UserList() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [deleteUsers] = useMutation(DELETE_USERS, {
    onCompleted: () => refetch(),
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      const sortedPatients = data.patients.filter(patient => patient.role === 'patient');
      setPatients(sortedPatients);
    }
  }, [data, loading]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUsers({ variables: { id } });
    }
  };

  if (loading) return <Spinner animation="border" />;

  if (error) {
    console.error(error);
    return <p>Error : ${error.message}(</p>;
  }

  return (
    <Container>
      <div className='userList'>
        <h1>Patients</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              {/*<th>Actions</th>*/}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.email}</td>
                {/*<td>
                  <Link
                    to={{
                      pathname: `/vitals/${patient.firstName}/${patient.lastName}`,
                      state: {
                        fullName: patient.firstName + "" + patient.lastName,
                      },
                    }}
                  >
                    <Button variant='contained' color='primary'>
                      Vitals
                  </Button>                  
                  </Link>
                  </td>*/}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default UserList;
