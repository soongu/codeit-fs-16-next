// ~/next-lab/components/ProfileRow.jsx
import TimeAgo from './TimeAgo.jsx';

const ProfileRow = ({ username, profileImage, minutes }) => {
  return (
    <div className='flex items-center gap-3'>
      <img
        src={profileImage}
        alt={`${username}의 프로필`}
        className='w-10 h-10 rounded-full'
      />
      <div>
        <p className='font-semibold'>{username}</p>
        <p className='text-xs text-gray-500'>
          <TimeAgo minutes={minutes} />
        </p>
      </div>
    </div>
  );
};

export default ProfileRow;
