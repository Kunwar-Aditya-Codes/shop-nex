import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useBoundStore } from '../app/store';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/api/axiosConfig';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { id } = useAuth();
  useEffect(() => {
    if (id) {
      navigate('/');
    }
  }, []);

  const setToken = useBoundStore((state) => state.setToken);
  const setUser = useBoundStore((state) => state.setUser);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading('Login...', { id: 'login' });

    if (!data.email || !data.password) {
      toast.error('All fields required!', { id: 'login' });
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/login', {
        ...data,
      });

      setToken(response.data.accessToken);

      toast.success('Success', {
        id: 'login',
      });

      setData({
        email: '',
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
      if (error instanceof AxiosError) {
        toast.error(error.message, {
          id: 'login',
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
          <input
            type='email'
            placeholder='Email'
            value={data.email}
            name='email'
            onChange={handleInput}
            autoFocus
            required
            className='rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
          />

          <div className='relative flex items-center'>
            <input
              type={show ? 'text' : 'password'}
              placeholder='Password'
              value={data.password}
              name='password'
              onChange={handleInput}
              className='w-full rounded-md border border-zinc-900 bg-transparent px-4 py-3 text-sm tracking-wide outline-none placeholder:text-zinc-700 focus:border-white'
            />
            <div className='absolute right-4  cursor-pointer'>
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
            disabled={!data.email || !data.password}
            className='rounded-md bg-white/75 py-2 font-light uppercase tracking-wider text-black outline-none disabled:cursor-not-allowed disabled:bg-zinc-900 disabled:text-zinc-700 '
          >
            Sign In
          </button>
        </form>

        <p className='mt-4 px-4 text-sm  tracking-wider text-zinc-400'>
          No account ?
          <span className='ml-1 text-white underline underline-offset-4'>
            <Link to='/sign_up'>New Account</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
