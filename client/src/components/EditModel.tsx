import { FC, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-hot-toast';
import { useBoundStore } from '../app/store';

interface EditModelProps {
  setEditModel: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    email: string;
    address: string[];
    profileImage: string;
  } | null;
}

const EditModel: FC<EditModelProps> = ({ setEditModel, user }) => {
  const {
    firstName: initialFirstName = '',
    lastName: initialLastName = '',
    profileImage: initialProfileImage = '',
  } = user || {};

  const [firstName, setFirstName] = useState<string>(initialFirstName);
  const [lastName, setLastName] = useState<string>(initialLastName);
  const [profileImage, setProfileImage] = useState<string>(initialProfileImage);

  const setUser = useBoundStore((state) => state.setUser);

  const axiosPrivate = useAxiosPrivate();

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageFile = files[0];

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setProfileImage(reader?.result as string);
      };
    }
  };

  const updateProfile = async () => {
    toast.loading('Updating details..', {
      id: 'update',
    });
    try {
      const response = await axiosPrivate.patch('/customer/profile', {
        _id: user?._id,
        firstName,
        lastName,
        profileImage,
      });

      const updatedDetails = response?.data?.customer;

      setUser(updatedDetails);

      toast.success('Updated', {
        id: 'update',
      });

      setEditModel(false);
    } catch (error) {
      console.log(error);
      toast.error('Try again later', {
        id: 'update',
      });
    }
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-[100] flex  items-center justify-center  bg-black/80 backdrop-blur-md'>
      <div className='flex  w-[90%] flex-col rounded-md bg-white/5 p-4  backdrop-blur-lg lg:w-[50%]'>
        <div className='flex w-full items-center justify-end pr-2 pt-2'>
          <IoCloseOutline
            onClick={() => setEditModel(false)}
            className='w-fit cursor-pointer text-end text-2xl text-white'
          />
        </div>

        <div className='my-8 flex w-full flex-col  px-4'>
          <div className='flex items-center justify-around  space-x-4 '>
            <input
              type='text'
              value={firstName}
              placeholder='First name'
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full rounded-sm border border-zinc-700 bg-transparent p-2 focus:border-white'
            />
            <input
              type='text'
              value={lastName}
              placeholder='Last name'
              onChange={(e) => setLastName(e.target.value)}
              className='w-full rounded-sm border border-zinc-700 bg-transparent p-2 focus:border-white'
            />
          </div>
          <div className='mt-6'>
            <input
              type='file'
              name='profileImage'
              accept='image/'
              onChange={handleImageInput}
              className='w-full cursor-pointer rounded-sm border-2 border-zinc-700 bg-transparent file:mr-2 file:border-none  file:p-2  '
            />

            {profileImage ? (
              <img src={profileImage} className='w-[30%] ' />
            ) : null}
          </div>
          <button
            onClick={updateProfile}
            className='mt-6 w-fit rounded-sm  bg-transparent bg-white px-6 py-2 text-center font-medium uppercase tracking-wider text-black  '
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
