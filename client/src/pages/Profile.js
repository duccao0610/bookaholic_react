import { useState } from 'react';
import Activity from '../components/Activity';
import PersonalInfo from '../components/PersonalInfo';

const shelves = ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Shelf 4'];

const Profile = () => {
  const [shelfToShow, setShelfToShow] = useState(3);
  const [showMoreBtn, setShowMorwBtn] = useState('Show more');
  const shelvesClone = [...shelves].slice(0, shelfToShow);

  const handleShowMoreShelves = () => {
    if (shelfToShow < shelves.length) {
      setShelfToShow(shelves.length);
      setShowMorwBtn('Show less');
    } else {
      setShelfToShow(3);
      setShowMorwBtn('Show more');
    }
  };

  const handleAddNewShelf = () => {};

  return (
    <div className='d-flex col-12 col-sm-12 col-md-12 col-lg-8 justify-content-center mx-auto mt-3 px-0'>
      <div id='profile-main-content' className='col-sm-12 col-md-9 col-lg-8'>
        <PersonalInfo
          id='profile-basic-info'
          inPage='profile'
          avatar='https://i.pinimg.com/originals/75/31/5d/75315db511a058432745fc37d82a7c44.png'
          upvote={2}
          downvote={2}
          nickname='Nguyễn Khắc Hùng'
          owningsQuant={30}
          reviewsQuant={120}
          bio='Hello mtfk adsf ads f asdf  asdfsdf a sadfsa fsaf ds f'
        />
        <div id='book-shelves' className='mb-3'>
          <div
            id='book-shelves-header'
            className='d-flex justify-content-between align-items-end border-bottom'>
            <div className='text-uppercase fw-bold'>bookshelves</div>
            <div
              className='btn btn-sm btn-primary mb-1'
              onClick={handleAddNewShelf}>
              New shelf
            </div>
          </div>
          <div className='d-flex flex-column ms-2'>
            {shelvesClone.map((item) => {
              return <a>{item}</a>;
            })}
          </div>
          <div className='w-100 text-center'>
            <div
              className={
                shelves.length <= 3 ? 'd-none' : 'btn btn-secondary btn-sm'
              }
              onClick={handleShowMoreShelves}>
              {showMoreBtn}
            </div>
          </div>
        </div>
        <div id='recent-activities'>
          <div
            id='activities-header'
            className='text-uppercase fw-bold border-bottom'>
            nickname's recent activities
          </div>
          <div id='activities-list'>
            <Activity
              inPage='profile'
              username='Nguyen Khac Hung'
              bookName='Chuoi An Mang A.B.C'
              authors={['Agatha Christie', 'Someone Else']}
              rating={2}
              cover='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435375133l/25802987._SY475_.jpg'
              review='Khi một sát nhân giết người hàng loạt bí danh ABC chế nhạo Poirot bằng những lá thư úp mở và giết người theo thứ tự chữ cái, Poirot tiến hành một phương pháp điều tra bất thường để truy tìm ABC. Chữ A là bà Ascher ờ Andover, B là Betty Barnard ở Bexhill, C là ngài Carmichael Clarke ở Churston. Qua từng vụ án, kẻ giết người càng tự tin hơn - nhưng để lại một vệt manh mối rõ ràng để chế nhạo Hercule Poirot tài ba có thể lại sai lầm đầu tiên và chí tử.'
              date='12/07/2021'
            />
          </div>
        </div>
      </div>
      <div className='d-none d-sm-none d-md-inline-block d-lg-inline-block col-md-3 col-lg-4 bg-warning'>
        Right panel
      </div>
    </div>
  );
};

export default Profile;
