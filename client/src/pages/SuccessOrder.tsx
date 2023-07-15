import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const SuccessOrder = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axiosPrivate.post('/verify/success', {
          token,
        });
        
        if (response.data.success === false) {
          navigate('/');
        }
      } catch (err) {
        navigate('/');
      }
    };

    validateToken();
  }, [token, navigate]);

  return (
    <div className='flex flex-grow items-center justify-center overflow-x-hidden'>
      <div className='mx-2 flex flex-col items-center space-y-16 rounded-md border border-zinc-900 p-10'>
        <h1 className='text-center text-2xl font-light tracking-wide lg:text-4xl'>
          Order Successfully Placed !! 🎉🎉
        </h1>
        <Link
          to='/'
          className='rounded-md bg-zinc-900 px-4 py-3 text-center text-lg font-light uppercase tracking-widest shadow-lg'
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};
export default SuccessOrder;
