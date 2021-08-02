import { Link } from "react-router-dom";
const UserItem = ({ user }) => {
  return (
    <div
      className=" justify-content-center px-3 py-2 mx-1 row border mb-2"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <div className="col-3 d-flex align-items-center justify-content-center">
        <img
          width="50px"
          height="50px"
          alt="avatar"
          src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
        />
      </div>
      <div className="col-8">
        <Link
          to={`/user/${user.username}`}
          className="text-dark"
          style={{ textDecoration: "none" }}
        >
          {user.nickname}
        </Link>
        <p className="font-italic" style={{ fontSize: "12px", opacity: 0.8 }}>
          {user.bio}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
