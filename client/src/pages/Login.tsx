import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await toast.promise(
        axiosInstance.post("/login", {
          email,
          password,
        }),
        {
          pending: "Fazendo login...",
          success: "Logado com sucesso!",
          error: "Erro ao logar, tente novamente.",
        }
      );
      const token = response.data.token;
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      };

      login(token, userData);
      navigate("/produtos");
      setIsLoading(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center h-screen bg-gray-50">
      <div className="flex justify-center items-center w-full">
        <form className="space-y-6 bg-white p-12 w-full max-w-md rounded-lg font-mono">
          <h1 className="text-3xl ">Faça login</h1>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
              placeholder="seuemail@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Senha:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
              required
            />
          </div>
          <Button
            text="Faça login"
            onClick={handleLogin}
            isLoading={isLoading}
          ></Button>
          <p className="text-sm font-light text-gray-500">
            Não possui uma conta?{" "}
            <span className="font-medium text-black hover:underline">
              <Link to="/registro">Criar uma conta</Link>
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Login;
