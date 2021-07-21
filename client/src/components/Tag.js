import { Link } from "react-router-dom";
const Tag = ({ variant, name, related }) => {
  return (
    <Link to={`/categories/` + name}>
      <div
        className={
          related
            ? "text-capitalize text-info"
            : ` badge badge-pill mr-1 + ${
                variant === 0
                  ? "badge-success"
                  : variant % 4 === 1
                  ? "badge-warning"
                  : variant % 4 === 2
                  ? "badge-danger"
                  : variant % 4 === 3
                  ? "badge-primary"
                  : "badge-info"
              }`
        }
      >
        {name}
      </div>
    </Link>
  );
};

export default Tag;
