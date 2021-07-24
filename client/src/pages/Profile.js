import { useState } from 'react';

import { Link } from 'react-router-dom';

import Activity from '../components/Activity';
import ReactPaginate from 'react-paginate';
import PersonalInfo from '../components/PersonalInfo';
import Shelf from '../components/Shelf';

const shelves = [
  'My fucking custom',
  'Shelf 2',
  'Shelf 3',
  'Shelf 4',
  'Shelf 5',
  'Shelf 6',
  'Shelf 7',
];

const Profile = () => {
  const shelvesPerGroup = 4;
  const [activeShelvesGroup, setActiveShelvesGroup] = useState(0);

  const handleClickShelvesList = (clickedGroup) => {
    console.log(clickedGroup.selected);
    setActiveShelvesGroup(clickedGroup.selected);
  };

  const goToShelvesPage = () => {};

  return (
    <div className='d-flex col-12 col-sm-12 col-md-12 col-lg-8 justify-content-center container px-0 mt-3'>
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
            <Link
              className='btn btn-sm btn-primary mb-1'
              to='/profile/shelves'
              onClick={goToShelvesPage}>
              Custom my shelves
            </Link>
          </div>
          <div className='d-flex my-3'>
            {[...shelves]
              .slice(
                activeShelvesGroup * shelvesPerGroup,
                activeShelvesGroup * shelvesPerGroup + shelvesPerGroup
              )
              .map((item, i) => {
                return <Shelf key={i} inPage='profile' shelfName={item} />;
              })}
          </div>

          <div className='w-100 d-flex justify-content-center'>
            <ReactPaginate
              pageCount={Math.ceil(shelves.length / shelvesPerGroup)}
              pageRangeDisplayed={shelvesPerGroup}
              marginPagesDisplayed={1}
              containerClassName='d-flex align-items-center'
              previousClassName='fw-bold py-0 px-2 me-2 btn btn-primary'
              previousLabel='Prev'
              nextClassName='fw-bold py-0 px-2 ms-2 btn btn-primary'
              nextLabel='Next'
              pageClassName='list-group-item fw-bold py-0 px-2'
              breakClassName='list-group-item fw-bold py-0 px-2'
              activeClassName='active'
              onPageChange={handleClickShelvesList}
            />
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
