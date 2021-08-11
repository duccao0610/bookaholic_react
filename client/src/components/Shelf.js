import { useState } from "react";
import { FaTrashAlt, FaEdit, FaCheckSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Shelf = ({
  shelfName,
  shelfId,
  inPage,
  isMyShelves,
  onShowBooksOnShelf,
  onDeleteShelf,
}) => {
  const params = useParams();

  const handleShowBooksOnShelf = () => {
    onShowBooksOnShelf(shelfId);
  };
  const handleDeleteShelf = () => {
    onDeleteShelf(shelfId);
  };

  const [inputNewShelfNameVal, setInputNewShelfNameVal] = useState(shelfName);
  const handleInputNewShelfName = (e) => {
    setInputNewShelfNameVal(e.target.value);
  };
  const [editShelfNameBtn, setEditShelfNameBtn] = useState(true);
  const handleEditShelfName = () => {
    if (!editShelfNameBtn) {
      fetch(
        `https://limitless-ravine-54816.herokuapp.com/user/${params.username}/shelves/${shelfId}/editShelfName`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ newShelfName: inputNewShelfNameVal }),
        }
      );
    }
    setEditShelfNameBtn(!editShelfNameBtn);
  };

  switch (inPage) {
    case "profile":
      return (
        <div className="col-3">
          <div className="col-12">
            <img
              className="w-100"
              // style={{ width: '50px', height: '60px' }}
              src="https://img.icons8.com/ios/452/book-shelf.png"
              alt=""
            />
          </div>
          <div className="text-center">{shelfName}</div>
        </div>
      );

    // default = Shelves page
    default:
      return (
        <div className="d-flex justify-content-between border-bottom my-1 py-2 w-100">
          <div className="d-flex align-items-start">
            <div
              className={isMyShelves ? "pointer me-1 p-0 align-top" : "d-none"}
              onClick={handleEditShelfName}
            >
              {editShelfNameBtn ? <FaEdit /> : <FaCheckSquare />}
            </div>
            {editShelfNameBtn ? (
              <div
                className="text-decoration-underline pointer pt-0"
                onClick={handleShowBooksOnShelf}
              >
                {inputNewShelfNameVal}
              </div>
            ) : (
              <input
                className="form-control form-control-sm"
                type="text"
                value={inputNewShelfNameVal}
                onChange={handleInputNewShelfName}
              />
            )}
          </div>
          <div
            className={isMyShelves ? "pointer p-0" : "d-none"}
            onClick={handleDeleteShelf}
          >
            <FaTrashAlt />
          </div>
        </div>
      );
  }
};

export default Shelf;
