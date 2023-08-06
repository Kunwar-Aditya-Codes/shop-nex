import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Brands from './pages/Brands';
import PersistLogin from './components/PersistLogin';
import SuccessOrder from './pages/SuccessOrder';
import Error from './pages/Error';
import ViewOrders from './pages/account/ViewOrders';
import Profile from './pages/account/Profile';
import AccountLayout from './components/AccountLayout';
import RequireAuth from './components/RequireAuth';
import OrderDetails from './pages/account/OrderDetails';
import DashboardLayout from './components/DashboardLayout';
import AllProducts from './pages/admin/AllProducts';

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

          <Route element={<RequireAuth />}>
            {/* Profile Panel */}
            <Route path='/account/:userId' element={<AccountLayout />}>
              <Route path='profile' element={<Profile />} />
              <Route path='view_orders' element={<ViewOrders />} />
              <Route path='view_orders/:orderId' element={<OrderDetails />} />
              <Route
                path='*'
                element={
                  <p className='text-center text-2xl font-light tracking-wider'>
                    Work under progress...
                  </p>
                }
              />
            </Route>

            {/* Admin Panel */}
            <Route path='/admin/:userId' element={<DashboardLayout />}>
              <Route path='all_products' element={<AllProducts />} />
              <Route
                path='*'
                element={
                  <p className='text-center text-2xl font-light tracking-wider'>
                    Work under progress...
                  </p>
                }
              />
            </Route>
          </Route>

          {/* Error */}
          <Route path='*' element={<Error />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
