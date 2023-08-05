import { useBoundStore } from '../app/store';
import jwtDecode from 'jwt-decode';

type Decoded = {
  id: string;
  isAdmin: boolean;
};

const useAuth = () => {
  const token = useBoundStore((state) => state.token);
  let id;
  let isAdmin;

  if (token && token !== undefined) {
    const decoded: Decoded = jwtDecode(token);
    id = decoded.id;
    isAdmin = decoded.isAdmin;

    return { id, isAdmin };
  }

  return { id, isAdmin };
};

export default useAuth;
