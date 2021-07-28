import BookOnShelf from "../components/BookOnShelf";
import Shelf from "../components/Shelf";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Shelves = () => {
  const [loading, setLoading] = useState(true);
  const [triggerFetchShelvesList, setTriggerFetchShelvesList] = useState(false);

  // Show shelves list
  const [userShelves, setUserShelves] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/user/${params.username}/shelves`)
      .then((res) => res.json())
      .then((resJson) => {
        setUserShelves(resJson[0].shelves);
        setLoading(false);
      });
  }, [params.username, triggerFetchShelvesList]);

  // Show books list on shelf
  const [currShowingShelf, setCurrShowingShelf] = useState({
    shelfId: "",
    bookList: [],
  });

  const handleShowBooksOnShelf = async (shelfId) => {
    await fetch(
      `http://localhost:5000/user/${params.username}/shelves/${shelfId}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setCurrShowingShelf({
          shelfId: shelfId,
          bookList: resJson[0].bookDetailList,
        });
      });
  };

  // Add new shelf
  const [inputShelfNameVal, setInputShelfNameVal] = useState("");
  const handleInputShelfName = (e) => {
    setInputShelfNameVal(e.target.value);
  };

  const [addShelfBtn, setAddShelfBtn] = useState(true);

  const handleAddShelf = async () => {
    const newShelf = { shelfName: inputShelfNameVal, bookList: [] };
    if (!addShelfBtn) {
      await fetch(
        `http://localhost:5000/user/${params.username}/shelves/addShelf`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newShelf),
        }
      );
      setTriggerFetchShelvesList(!triggerFetchShelvesList);
    }
    setInputShelfNameVal("");
    setAddShelfBtn(!addShelfBtn);
  };

  // Delete shelf
  const handleDeleteShelf = async (shelfId) => {
    await fetch(
      `http://localhost:5000/user/${params.username}/shelves/${shelfId}/deleteShelf`,
      {
        method: "PUT",
      }
    );
    setTriggerFetchShelvesList(!triggerFetchShelvesList);
  };

  // Delete book on shelf
  const handleDeleteBookOnShelf = (bookId) => {
    currShowingShelf.bookList.splice(
      currShowingShelf.bookList.findIndex((item) => {
        return item._id === bookId;
      }),
      1
    );

    setCurrShowingShelf((prev) => {
      return { ...prev };
    });
  };

  return loading ? (
    <></>
  ) : (
    <div className='d-flex container'>
      <div id='left-panel' className='col-3'>
        <div>ALL SHELVES</div>
        <div>
          <div
            id='shelves-list'
            className='d-flex flex-column align-items-start'>
            {userShelves.map((item, i) => {
              return (
                <Shelf
                  key={i}
                  shelfName={item.shelfName}
                  shelfId={item._id}
                  onShowBooksOnShelf={handleShowBooksOnShelf}
                  onDeleteShelf={handleDeleteShelf}
                />
              );
            })}
          </div>
          <div>
            {addShelfBtn ? (
              <></>
            ) : (
              <input
                className='form-control form-control-sm'
                type='text'
                onChange={handleInputShelfName}
                value={inputShelfNameVal}
              />
            )}
          </div>
        </div>
        <div className='btn btn-sm btn-primary' onClick={handleAddShelf}>
          {addShelfBtn ? "Add a shelf" : "Save"}
        </div>
      </div>
      <div id='right-panel' className='col-9'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Cover</th>
              <th scope='col'>Title</th>
              <th scope='col'>Author(s)</th>
              <th scope='col'>Avg. rating</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody id='books-on-shelf'>
            {currShowingShelf.bookList.map((item, i) => {
              return (
                <BookOnShelf
                  key={i}
                  book={item}
                  shelfId={currShowingShelf.shelfId}
                  onDeleteBookOnShelf={handleDeleteBookOnShelf}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shelves;
