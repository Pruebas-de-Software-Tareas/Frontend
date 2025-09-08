import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser({ username, password });
      login(data.access_token);
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
     
     
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Bienvenido de vuelta</span>
          <span className="font-light text-gray-400 mb-8">
            Ingresa a tu cuenta para continuar
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Email / Usuario</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Contraseña</span>
              <input
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Iniciar sesión
            </button>
          </form>
          <div className="text-center text-gray-400">
            ¿No tienes una cuenta?
            <Link to="/register" className="font-bold text-black ml-1">Regístrate</Link>
          </div>
        </div>
  



        <div className="relative">
            <img
              src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=826"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
        </div>
      </div>
    </div>
  );
};