import { useEffect, useState } from "react";
import { useBoundStore } from "../app/store";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import usePersist from "../hooks/usePersist";

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
        console.log(err);
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
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};
export default PersistLogin;
