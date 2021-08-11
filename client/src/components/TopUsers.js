import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { Spinner } from "react-bootstrap";
import "./TopUsers.css";
const TopUsers = ({ onTab }) => {
  const [topUsersData, setTopUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let loadingData = true;
    const top = onTab ? 10 : 5;
    fetch(`https://polar-savannah-23530.herokuapp.com/user/ranking/${top}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (loadingData) {
          setLoading(false);
          setTopUsersData(resJson);
        }
      });
    return () => {
      loadingData = false;
    };
  }, [onTab]);
  return (
    <div className='mt-lg-5 mt-3'>
      <h6 className='fw-bold d-none d-md-inline-block'>Top Users</h6>
      {loading ? (
        <div className='text-center mt-4 vh-100'>
          <Spinner animation='border' variant='primary' className='mt-3' />
        </div>
      ) : (
        <div
          className='border rounded pt-3 px-3 px-lg-2 rank d-flex flex-column justify-content-around'
          style={{ background: "rgba(85, 42, 42,0.9)" }}
        >
          {topUsersData.map((user, idx) => {
            return <UserItem key={idx} user={user} idx={idx} inRank />;
          })}
        </div>
      )}
    </div>
  );
};

export default TopUsers;
