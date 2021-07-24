import { Image } from 'react-bootstrap';
import ProfileVoting from './ProfileVoting';

const PersonalInfo = ({
  inPage,
  avatar,
  reviewsQuant,
  owningsQuant,
  nickname,
  bio,
}) => {
  switch (inPage) {
    // Default = profile page
    default:
      return (
        <div className='d-flex mb-4 flex-column flex-sm-row flex-md-row flex-lg-row'>
          <div className='d-flex flex-column align-items-center'>
            <Image src={avatar} roundedCircle width={150} height={150} />
            <div className='d-flex justify-content-evenly'>
              <ProfileVoting isUpvote={true} votesQuant={123} />
              <ProfileVoting isUpvote={false} votesQuant={3456} />
            </div>
          </div>
          <div className='ms-lg-5 w-100'>
            <h4 className='border-bottom pb-2 text-uppercase text-center'>
              {nickname}
            </h4>
            <table className='table table-sm table-borderless align-top'>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Books</th>
                  <td>{owningsQuant}</td>
                </tr>
                <tr>
                  <th>Reviews</th>
                  <td>{reviewsQuant}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>{bio}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
  }
};

export default PersonalInfo;
