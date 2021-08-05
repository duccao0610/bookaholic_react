import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { Spinner } from "react-bootstrap";
const TopUsers = () => {
  const [topUsersData, setTopUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let loadingData = true;
    const top = 5;
    fetch(`http://localhost:5000/user/ranking/${top}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("TopUsers", resJson);
        if (loadingData) {
          setLoading(false);
          setTopUsersData(resJson);
        }
      });
    return () => {
      loadingData = false;
    };
  }, []);
  return (
    <div className="mt-5">
      <h6 className="fw-bold">Top Users</h6>
      {loading ? (
        <div className="text-center mt-4 vh-100">
          <Spinner animation="border" variant="primary" className="mt-3" />
        </div>
      ) : (
        <div
          className="border rounded pt-3 px-1"
          style={{
            minHeight: "400px",
            // minWidth: "fit-content",
            maxWidth: "300px",
            background: "rgba(244, 241, 234,0.3)",
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          }}
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
