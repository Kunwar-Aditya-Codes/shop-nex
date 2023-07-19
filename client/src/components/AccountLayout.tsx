import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <div>
      <h1>Account</h1>
      <Outlet />
    </div>
  );
};
export default AccountLayout;
