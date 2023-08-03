import { FC, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useBoundStore } from '../app/store';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface VerifyEmailModalProps {
  setVerifyEmailModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyEmailModal: FC<VerifyEmailModalProps> = ({
  setVerifyEmailModel,
}) => {
  const [verificationCode, setVerificationCode] = useState<string>('');

  const user = useBoundStore((state) => state.user) as {
    email: string;
  };

  const axiosPrivate = useAxiosPrivate();

  // Send verification code
  const sendCode = async () => {
    toast.loading('Sending email', {
      id: 'verification-email',
    });

    try {
      const response = await axiosPrivate.post(
        '/auth/send_verification_email',
        {
          email: user.email,
        }
      );

      toast.success(response?.data?.message, {
        id: 'verification-email',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message, {
          id: 'verification-email',
        });
        return;
      }

      toast.error('Some error occured! Try again after sometime', {
        id: 'verification-email',
      });
    }
  };

  // Verify email
  const verifyEmail = async () => {
    toast.loading('Verifying..', {
      id: 'verification-code',
    });

    try {
      const response = await axiosPrivate.post('/auth/verify_email', {
        email: user.email,
        otp: verificationCode,
      });

      toast.success(response?.data?.message, {
        id: 'verification-code',
      });

      setVerifyEmailModel(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message, {
          id: 'verification-code',
        });
        return;
      }

      toast.error('Some error occured! Try again after sometime', {
        id: 'verification-code',
      });
    }
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md'>
      <div className='flex h-[45%] w-[90%] flex-col rounded-md bg-white/5 backdrop-blur-lg  md:w-[70%] lg:w-[40%]'>
        <div className='flex w-full items-center justify-end pr-2 pt-2'>
          <IoCloseOutline
            onClick={() => setVerifyEmailModel(false)}
            className='w-fit cursor-pointer text-end text-2xl text-white'
          />
        </div>

        <div className='mt-8 flex flex-col space-y-8 px-4'>
          <div className='flex flex-col'>
            <input
              type='text'
              value={user?.email}
              disabled
              className='cursor-not-allowed rounded-md border border-zinc-700 bg-transparent p-2 font-light tracking-wide outline-none '
            />
            <button
              onClick={sendCode}
              className='mt-2 w-fit rounded-md border px-4 py-2  text-start font-medium'
            >
              Send Code
            </button>
          </div>

          <input
            type='text'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder='Enter verification code'
            className='rounded-md border border-zinc-700 bg-transparent p-2 font-light tracking-wide outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-zinc-700 '
          />

          <button
            onClick={verifyEmail}
            className='rounded-md bg-white py-2 text-lg font-medium uppercase tracking-wide text-black'
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
