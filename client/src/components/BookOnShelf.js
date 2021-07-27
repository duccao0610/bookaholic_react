const BookOnShelf = ({ book }) => {
  const { cover, title, authors, averageRating } = book;
  return (
    <tr>
      <td>
        <img src={cover} alt='' style={{ width: "50px" }} />
      </td>
      <td>{title}</td>
      <td>{authors}</td>
      <td>{averageRating}</td>
    </tr>
  );
};

export default BookOnShelf;
