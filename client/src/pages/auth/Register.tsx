import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import { z } from 'zod';
import { register } from '../../lib/validations/authSchema';
import { axiosInstance } from '../../lib/api/axiosConfig';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useBoundStore } from '../../app/store';

type RegisterData = z.infer<typeof register>;

const Register = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<RegisterData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const setToken = useBoundStore((state) => state.setToken);
  const setUser = useBoundStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading('Registering...', { id: 'register' });

    const { email, firstName, lastName, password } = data;

    if (!email || !firstName || !lastName || !password) {
      toast.error('All fields required!', { id: 'register' });
      return;
    }

    try {
      const validatedInput = register.parse({
        ...data,
      });

      const response = await axiosInstance.post('/auth/sign_up', {
        ...validatedInput,
      });

      setToken(response.data.accessToken);

      toast.success('Success', {
        id: 'register',
      });

      setData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      });

      const userData = await axiosInstance.get('/customer/profile', {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      });

      setUser(userData.data.customer);

      navigate('/products');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const { message, path } = err;
          const errorMessage =
            path.length > 0 ? `${path[0]}: ${message}` : message;
          toast.error(errorMessage, {
            id: 'register',
          });
        });
      }

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          id: 'register',
        });
        return;
      }
    }
  };

  return (
    <div className='flex flex-grow items-center justify-center'>
      <div className='flex w-full max-w-xl flex-col items-center justify-center px-4'>
        <form
          onSubmit={handleSubmit}
          className='flex w-full flex-col space-y-8 rounded-xl  px-4 text-lg md:p-10 '
        >
          <div className='flex w-full flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-2 lg:space-y-0'>
            <input
              type='text'
              placeholder='First Name'
              value={data.firstName}
              name='firstName'
              onChange={handleInput}
              autoFocus
              required
              className='w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
            />
            <input
              type='text'
              value={data.lastName}
              name='lastName'
              onChange={handleInput}
              placeholder='Last Name'
              required
              className='w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
            />
          </div>

          <input
            type='email'
            value={data.email}
            name='email'
            onChange={handleInput}
            placeholder='Email'
            required
            className='rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
          />

          <div className='relative flex items-center'>
            <input
              type={show ? 'text' : 'password'}
              value={data.password}
              name='password'
              onChange={handleInput}
              placeholder='Password'
              className='w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
            />
            <div className='absolute right-4 cursor-pointer'>
              {show ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShow(!show)}
                  className='h-6 w-6 text-white'
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setShow(!show)}
                  className='h-6 w-6 text-zinc-700'
                />
              )}
            </div>
          </div>
          <button
            disabled={
              !data.email || !data.password || !data.firstName || !data.lastName
            }
            className='rounded-md bg-white/75 py-2 font-light uppercase tracking-wider text-black outline-none disabled:cursor-not-allowed disabled:bg-zinc-900 disabled:text-zinc-700 '
          >
            Sign Up
          </button>
        </form>

        <p className='mt-4 px-4 text-sm  tracking-wider text-zinc-400'>
          Have account ?
          <span className='ml-1 text-white underline underline-offset-4'>
            <Link to='/sign_in'>Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;
