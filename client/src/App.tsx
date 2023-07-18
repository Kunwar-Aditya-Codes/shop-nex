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

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route path='/sign_in' element={<Login />} />
          <Route path='/sign_up' element={<Register />} />
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product_brands' element={<Brands />} />
          <Route path='/cart_orders' element={<Cart />} />
          <Route path='/orders/success/:token' element={<SuccessOrder />} />
          <Route path='/:userId/view_orders' element={<ViewOrders />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
