import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";
import { CartProvider } from "../context/CartContext";
import SuccesPayment from "../pages/SuccessPayment";

const AppRoutes = () => {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<SuccesPayment />} />
        </Routes>
      </CartProvider>
    </>
  );
};

export default AppRoutes;
