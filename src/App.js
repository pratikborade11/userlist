import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import ReactPaginate from 'react-paginate';
import userIcon from './assets/user.png'; 
import './App.css';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 20;

  useEffect(() => {
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = userIcon;
  };

  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">UserInfo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Pratik</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container fluid className="mt-4 app-container">
      
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-primary">Users List</h1>
        </Col>
        <hr />
      </Row>
      {loading && (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      )}
      {error && (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      {!loading && !error && (
        <>
          <Row>
            <Col md={6} className="user-list-container">
              <UserList
                users={users}
                onSelectUser={handleSelectUser}
                currentPage={currentPage}
                usersPerPage={usersPerPage}
                handleImageError={handleImageError}
              />
            </Col>
            <Col md={6} className="user-details-container">
              <UserDetails user={selectedUser} handleImageError={handleImageError} />
            </Col>
          </Row>
          <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(users.length / usersPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </Col>
    </Row>
        </>
      )}
    </Container>
    </>
  );
};

export default App;
