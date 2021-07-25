const Shelf = ({ shelfName, shelfId, inPage }) => {
  switch (inPage) {
    case 'profile':
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

    default:
      break;
  }
};

export default Shelf;
