import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BookOnShelf = ({ book, shelfId, onDeleteBookOnShelf }) => {
  const { cover, title, authors, averageRating, _id } = book;

  const params = useParams();

  const handleDeleteBookOnShelf = () => {
    fetch(
      `http://localhost:5000/user/${params.username}/shelves/${shelfId}/deleteBook/book=${_id}`,
      {
        method: "PUT",
      }
    );
    onDeleteBookOnShelf(_id);
  };

  return (
    <tr>
      <td>
        <img src={cover} alt='' style={{ width: "50px" }} />
      </td>
      <td>{title}</td>
      <td>{authors}</td>
      <td>{averageRating}</td>
      <td>
        <FaTrashAlt className='pointer' onClick={handleDeleteBookOnShelf} />
      </td>
    </tr>
  );
};

export default BookOnShelf;
