import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart_orders" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
