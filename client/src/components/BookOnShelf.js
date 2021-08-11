import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BookOnShelf = ({ book, shelfId, onDeleteBookOnShelf, isMyShelves }) => {
  const { cover, title, authors, averageRating, _id } = book;

  const params = useParams();

  const handleDeleteBookOnShelf = () => {
    fetch(
      `https://limitless-ravine-54816.herokuapp.com/user/${params.username}/shelves/${shelfId}/deleteBook/book=${_id}`,
      {
        method: "PUT",
      }
    );
    onDeleteBookOnShelf(_id);
  };

  return (
    <tr>
      <td className="d-none d-md-table-cell fs-6">
        <img src={cover} alt="" style={{ width: "50px" }} />
      </td>
      <td>{title}</td>
      <td>{authors}</td>
      <td>{averageRating}</td>
      <td className={isMyShelves ? "" : "d-none"}>
        <FaTrashAlt className="pointer" onClick={handleDeleteBookOnShelf} />
      </td>
    </tr>
  );
};

export default BookOnShelf;
