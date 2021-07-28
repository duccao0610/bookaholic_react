import { FaTrashAlt } from "react-icons/fa";

const Shelf = ({
  shelfName,
  shelfId,
  inPage,

  onShowBooksOnShelf,
  onDeleteShelf,
}) => {
  const handleShowBooksOnShelf = () => {
    onShowBooksOnShelf(shelfId);
  };
  const handleDeleteShelf = () => {
    onDeleteShelf(shelfId);
  };

  switch (inPage) {
    case "profile":
      return (
        <div className='col-3'>
          <div className='col-12'>
            <img
              className='w-100'
              // style={{ width: '50px', height: '60px' }}
              src='https://img.icons8.com/ios/452/book-shelf.png'
              alt=''
            />
          </div>
          <div className='text-center'>{shelfName}</div>
        </div>
      );

    // default = Shelves page
    default:
      return (
        <div className='d-flex justify-content-between align-items-center'>
          <div
            className='text-decoration-underline pointer pt-0'
            onClick={handleShowBooksOnShelf}>
            {shelfName}
          </div>
          <FaTrashAlt className='pointer ms-3' onClick={handleDeleteShelf} />
        </div>
      );
  }
};

export default Shelf;
