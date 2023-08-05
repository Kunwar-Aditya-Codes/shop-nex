import { useEffect, useState } from 'react';
import { useBoundStore } from '../app/store';
import useRefreshToken from '../hooks/useRefreshToken';
import { Outlet } from 'react-router-dom';
import usePersist from '../hooks/usePersist';
import { TbLoader } from 'react-icons/tb';

const PersistLogin = () => {
  const token = useBoundStore((state) => state.token);
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = usePersist();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!token && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token, persist, refresh]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className='flex h-full flex-grow items-center justify-center '>
          <TbLoader className='h-12 w-12 animate-spin' />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistLogin;
