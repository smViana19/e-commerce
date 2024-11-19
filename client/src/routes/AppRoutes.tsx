import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "../context/CartContext";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Register from "../pages/Register";
import SuccesPayment from "../pages/SuccessPayment";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/payment-success" element={<SuccesPayment />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route
              path="/pedidos"
              element={<ProtectedRoute element={<Orders />} />}
            />
          </Route>
        </Routes>
      </CartProvider>
    </>
  );
};

export default AppRoutes;
