import { useEffect, useState } from "react";
import UserItem from "./UserItem";
const TopUsers = () => {
  const [topUsersData, setTopUsersData] = useState([]);

  useEffect(() => {
    let loadingData = true;
    const top = 5;
    fetch(`http://localhost:5000/user/ranking/${top}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log("TopUsers", resJson);
        if (loadingData) {
          setTopUsersData(resJson);
        }
      });
    return () => {
      loadingData = false;
    };
  }, []);
  return (
    <div className="mt-5">
      <h6>Top Users</h6>
      <div
        className="border rounded pt-3"
        style={{
          minHeight: "400px",
          background: "rgba(244, 241, 234,0.3)",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        {topUsersData.map((user, idx) => {
          return <UserItem key={idx} user={user} idx={idx} inRank />;
        })}
      </div>
    </div>
  );
};

export default TopUsers;
