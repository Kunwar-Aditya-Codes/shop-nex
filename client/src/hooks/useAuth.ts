import { useBoundStore } from "../app/store";
import jwtDecode from "jwt-decode";

type Decoded = {
  id: string;
  role: string;
};

const useAuth = () => {
  const token = useBoundStore((state) => state.token);
  let id;
  let role;

  if (token && token !== undefined) {
    const decoded: Decoded = jwtDecode(token);
    id = decoded.id;
    role = decoded.role;

    return { id, role };
  }

  return { id, role };
};

export default useAuth;
