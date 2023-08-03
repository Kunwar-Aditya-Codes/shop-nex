import { useBoundStore } from '../../app/store';

type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  email: string;
  address: string[];
  profileImage: string;
} | null;

const Profile = () => {
  const user = useBoundStore((state) => state.user) as Customer;

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col items-center space-y-16 lg:flex-row  lg:items-start lg:justify-between lg:space-y-0'>
      <div className='flex h-full w-full flex-col items-center divide-y-2 divide-zinc-900 rounded-md border-2 border-zinc-800 bg-gradient-to-br from-black to-zinc-900 shadow-xl lg:w-fit lg:px-16'>
        <div className='flex h-full w-full items-center justify-center py-8'>
          <img
            src={user?.profileImage}
            alt='profile_img'
            className='max-w-[12rem] rounded-full'
          />
        </div>
        <div className='flex w-full flex-col items-center space-y-4 py-8 font-light  '>
          <h1 className='w-full text-center text-lg  tracking-widest'>
            {user?.firstName} {user?.lastName}
          </h1>
          <p className=' w-full text-center tracking-wider'>{user?.email}</p>
          {user?.isVerified ? (
            <p className='text-center   tracking-wider '>✅ Email Verifed</p>
          ) : (
            <p className='text-center  tracking-wider '>
              ⚠️ Email Verification Required
            </p>
          )}
        </div>
      </div>
      <div className='flex w-full flex-col items-center space-y-6 lg:w-auto'>
        {user?.isVerified ? null : (
          <button className='w-full rounded-sm  border-2 border-zinc-800 px-8 py-3 font-light tracking-wider text-white transition ease-out hover:bg-zinc-900'>
            Verify Email
          </button>
        )}
        <button className='w-full rounded-sm border-2 border-zinc-800 px-8 py-3 font-light    transition ease-out hover:bg-zinc-900 '>
          Edit Profile
        </button>
        <button className='w-full rounded-sm border-2 border-zinc-800 px-8 py-3 font-light  transition ease-out hover:bg-zinc-900 '>
          Edit Image
        </button>
      </div>
    </div>
  );
};

export default Profile;
