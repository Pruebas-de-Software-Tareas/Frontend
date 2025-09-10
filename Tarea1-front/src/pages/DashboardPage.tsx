import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ReporteEventos {
  total_eventos: number;
  suma_cupos_disponibles: number;
  eventos_agotados: number;
}

export const DashboardPage = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [reporte, setReporte] = useState<ReporteEventos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/reportes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReporte(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Error al cargar el reporte');
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">¡Bienvenido al Dashboard!</h1>
      <p className="text-lg mb-8">Esta página está protegida.</p>

      {loading && <p className="text-gray-500">Cargando reporte...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {reporte && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Resumen de Eventos</h2>
          <ul className="space-y-2">
            <li>Total de eventos registrados: <span className="font-bold">{reporte.total_eventos}</span></li>
            <li>Suma de cupos disponibles: <span className="font-bold">{reporte.suma_cupos_disponibles}</span></li>
            <li>Eventos agotados: <span className="font-bold">{reporte.eventos_agotados}</span></li>
          </ul>
        </div>
      )}

      <Link to="/eventos">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
          Gestionar Eventos
        </button>
      </Link>

      <button 
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
