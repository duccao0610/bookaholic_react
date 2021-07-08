import { Image, Container, Col, Row } from 'react-bootstrap';

const Activity = ({ username, bookName, rating, date, review, cover }) => {
  return (
    <div className=' border border-dark p-3 w-100 '>
      {/* post's header */}
      <div className='d-flex align-items-center'>
        <Image
          src='https://cdn.tgdd.vn//GameApp/1331168//20-500x500.jpg'
          width={35}
          height={35}
          roundedCircle
        />
        <div className='ml-2 '>
          <div>
            <span className='fw-bold'>{username}</span> <span>rated</span>
            {' ww'}
            <span className='fw-bold'>{bookName}</span> <span>{rating}⭐</span>
          </div>
          <div className='fst-italic' style={{ fontSize: '13px' }}>
            {date}
          </div>
        </div>
      </div>
      <div className='px-1 my-2'>{review}</div>
      <div>
        <img src={cover} />
      </div>
    </div>
  );
};

export default Activity;
