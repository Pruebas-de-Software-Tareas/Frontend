import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({ username, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al registrar. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left Side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Crea tu cuenta</span>
          <span className="font-light text-gray-400 mb-8">
            ¡Bienvenido! Por favor ingresa tus datos.
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
              Crear cuenta
            </button>
          </form>
          <div className="text-center text-gray-400">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="font-bold text-black ml-1">Inicia sesión</Link>
          </div>
        </div>
        {/* Right Side */}
        <div className="relative">
            <img
              src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=826"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
        </div>
      </div>
    </div>
  );
};