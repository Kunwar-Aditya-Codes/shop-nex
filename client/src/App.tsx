import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Brands from './pages/Brands';
import PersistLogin from './components/PersistLogin';
import SuccessOrder from './pages/SuccessOrder';
import Error from './pages/Error';
import ViewOrders from './pages/ViewOrders';
import Profile from './pages/Profile';
import AccountLayout from './components/AccountLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          {/* Auth */}
          <Route path='/sign_in' element={<Login />} />
          <Route path='/sign_up' element={<Register />} />
          <Route index element={<Home />} />

          {/* Products & Brands */}
          <Route path='/products' element={<Products />} />
          <Route path='/product_brands' element={<Brands />} />

          {/* Cart & Payments */}
          <Route path='/cart_orders' element={<Cart />} />
          <Route path='/orders/success/:token' element={<SuccessOrder />} />

          {/* Account Dashboard */}
          <Route path='/account/:userId' element={<AccountLayout />}>
            <Route path='profile' element={<Profile />} />
            <Route path='view_orders' element={<ViewOrders />} />
          </Route>

          {/* Error */}
          <Route path='*' element={<Error />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
