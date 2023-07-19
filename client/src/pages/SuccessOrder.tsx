import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const SuccessOrder = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axiosPrivate.post('/verify/success', {
          token,
        });

        if (response.data.success === false) {
          navigate('/');
        } else {
          setTimeout(() => {
            navigate(`/account/${id}/view_orders`);
          }, 5000);
        }
      } catch (err) {
        navigate('/');
      }
    };

    validateToken();
  }, [token, navigate, axiosPrivate]);

  return (
    <div className='flex flex-grow items-center justify-center overflow-x-hidden'>
      <div className='mx-2 flex flex-col items-center space-y-16 rounded-md border border-zinc-900 p-10'>
        <h1 className='text-center text-2xl font-light tracking-wide lg:text-3xl'>
          Order Successfully Placed !! 🎉🎉
        </h1>
        <p className='text-center text-lg font-bold '>
          Redirecting to order history...
        </p>
      </div>
    </div>
  );
};
export default SuccessOrder;
