import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ResumeScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "N/A");
      setEmail(userInfo.email || "N/A");
    }
  }, [userInfo]);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Sidebar with User Details */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={userInfo?.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "100px", height: "100px" }}
              />
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{userInfo?.bio || "No bio available"}</p>
              <ul className="list-group list-group-flush text-start">
                <li className="list-group-item">
                  <strong>Email:</strong> {email}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong> {userInfo?.location || "Not provided"}
                </li>
                <li className="list-group-item">
                  <strong>Joined:</strong> {userInfo?.joined ? new Date(userInfo.joined).toLocaleDateString() : "Unknown"}
                </li>
              </ul>
              <Button variant="primary" onClick={() => navigate('/update-profile')}>update profile</Button>
            </div>
          </div>
        </div>

        {/* Main Content with Badges */}
        <div className="col-md-9">
          <h3>Badges</h3>
          <div className="row">
            {userInfo?.badges?.length > 0 ? (
              userInfo.badges.map((badge) => (
                <div className="col-sm-6 col-md-4 mb-3" key={badge._id}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h6>{badge.title}</h6>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No badges earned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScreen;
