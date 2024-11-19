import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../services/axios";
import { Button } from "../components/Button";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await toast.promise(
        axiosInstance.post("/users", {
          name,
          email,
          password,
        }),
        {
          pending: "Criando conta...",
          success: "Conta criada com sucesso!",
          error: "Erro ao criar conta.",
        }
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center h-screen bg-gray-50">
      <div className="flex justify-center items-center w-full">
        <form className="space-y-6 bg-white p-12 w-full max-w-md rounded-lg font-mono">
          <h1 className="text-3xl ">Crie sua conta</h1>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
              placeholder="Seu nome"
              required
            />
          </div>
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
            text="Criar conta"
            onClick={handleRegister}
            isLoading={isLoading}
          ></Button>
          <p className="text-sm font-light text-gray-500">
            Possui uma conta?{" "}
            <span className="font-medium text-black hover:underline">
              <Link to="/login">Faça login</Link>
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Register;
