import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import userIcon from '../assets/user.png';
import loader from '../assets/loader.gif';

const UserDetails = ({ user }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = userIcon;
    setImageLoading(false);
    
    
    user.avatar = userIcon;
  };

  if (!user) {
    return <div className="user-details-placeholder">Select a user to see details</div>;
  }

  return (
    <Card className="user-details-card">
      <Card.Header>
        <div className="text-center">
          <div className="position-relative d-inline-block img">
            {imageLoading && <Image src={loader} className="loader" />}
            <Image
              src={user.avatar || userIcon}
              roundedCircle
              width="40"
              height="40"
              className={`user-avatar ${imageLoading ? 'hidden' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          <div className="mt-2">
            <h5>{`${user.profile.firstName} ${user.profile.lastName}`}</h5>
            <p>Username: {user.profile.username}</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text><strong>Email:</strong> {user.profile.email}</Card.Text>
        <Card.Text><strong>Job Title:</strong> {user.jobTitle}</Card.Text>
        <Card.Text><strong>Bio:</strong> {user.Bio}</Card.Text>
        <Card.Text><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserDetails;
