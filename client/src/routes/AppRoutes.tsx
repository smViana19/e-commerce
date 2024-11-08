import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
