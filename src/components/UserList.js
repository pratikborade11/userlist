import React, { useState, useEffect } from 'react';
import { ListGroup, Spinner, Image, Row, Col } from 'react-bootstrap';
import userIcon from '../assets/user.png'; 
import loader from '../assets/loader.gif'; 

const UserList = ({ users, onSelectUser, currentPage, usersPerPage }) => {
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  
  const startIdx = currentPage * usersPerPage;
  const endIdx = startIdx + usersPerPage;
  const displayUsers = users.slice(startIdx, endIdx);

  useEffect(() => {
   
    setImageLoading({});
  }, [currentPage]);

  const handleUserClick = async (user) => {
    setLoadingUserDetails(true);
    onSelectUser(user);
    setLoadingUserDetails(false);
  };

  const handleImageLoad = (userId) => {
    setImageLoading(prevState => ({
      ...prevState,
      [userId]: true 
    }));
  };

  const handleImageError = (e, userId) => {
    if (!imageLoading[userId]) {
     
      e.target.onerror = null; 
      e.target.src = userIcon; 
      setImageLoading(prevState => ({
        ...prevState,
        [userId]: false 
      }));
    }
  };

  return (
    <>
      <ListGroup>
        {displayUsers.map((user, index) => (
          <ListGroup.Item key={`${user.id}_${index}`} action onClick={() => handleUserClick(user)}>
            <Row>
              <Col xs={2}>
               
                {!imageLoading[user.id] && <Image src={loader} className="loader" />}
                
                <Image
                  src={user.avatar || userIcon}
                  roundedCircle
                  width="40"
                  height="40"
                  className={`user-avatar ${imageLoading[user.id] ? '' : 'hidden'}`}
                  onLoad={() => handleImageLoad(user.id)}
                  onError={(e) => handleImageError(e, user.id)}
                />
              </Col>
              <Col xs={10}>
                {`${user.profile.firstName} ${user.profile.lastName}`}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {loadingUserDetails && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <span className="ml-2">Loading user details...</span>
        </div>
      )}
    </>
  );
};

export default UserList;
