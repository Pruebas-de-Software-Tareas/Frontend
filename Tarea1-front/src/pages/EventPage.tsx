import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import type { EventoPayload } from '../api/event';
import { fetchEventos, createEvento, updateEvento, deleteEvento } from '../api/event';

const categorias = ['Todas', 'Charla', 'Taller', 'Show'];
const initialForm = {
  nombre: '',
  descripcion: '',
  fecha: '',
  categoria: 'Charla',
  precio: '',
  cupos_disponibles: '',
};

export default function EventPage() {
  const { token } = useAuth();
  const [eventos, setEventos] = useState<any[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('Todas');
  const [precioMax, setPrecioMax] = useState('');

  const loadEventos = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchEventos(token);
      setEventos(data);
    } catch {
      setError('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventos();
    // eslint-disable-next-line
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError('');
    setMessage('');

    if (!form.nombre || !form.descripcion || !form.fecha || !form.categoria || !form.precio || !form.cupos_disponibles) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (isNaN(Number(form.precio)) || isNaN(Number(form.cupos_disponibles))) {
      setError('Precio y cupos deben ser números');
      return;
    }

    const payload: EventoPayload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      fecha: form.fecha,
      categoria: form.categoria,
      precio: parseInt(form.precio),
      cupos_disponibles: parseInt(form.cupos_disponibles),
    };

    try {
      if (editId !== null) {
        await updateEvento(token, editId, payload);
        setMessage('Evento actualizado correctamente');
      } else {
        await createEvento(token, payload);
        setMessage('Evento creado correctamente');
      }
      setForm(initialForm);
      setEditId(null);
      loadEventos();
    } catch {
      setError('Error al guardar el evento');
    }
  };

  const handleEdit = (evento: any) => {
    setForm({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      categoria: evento.categoria,
      precio: evento.precio.toString(),
      cupos_disponibles: evento.cupos_disponibles.toString(),
    });
    setEditId(evento.id);
    setMessage('');
    setError('');
  };

  const handleDeleteEvento = async (id: number) => {
    if (!token) return;
    if (!window.confirm('¿Seguro que deseas eliminar este evento?')) return;

    setError('');
    setMessage('');
    try {
      await deleteEvento(token, id);
      setMessage('Evento eliminado correctamente');
      loadEventos();
    } catch {
      setError('Error al eliminar el evento');
    }
  };

  // filtrado en tiempo real
  const filteredEventos = eventos.filter(ev => {
    const searchLower = search.toLowerCase();
    const matchesSearch = ev.nombre.toLowerCase().includes(searchLower) || ev.descripcion.toLowerCase().includes(searchLower);
    const matchesCategoria = filterCategoria === 'Todas' || ev.categoria === filterCategoria;
    const precioEv = Number(ev.precio);
    const max = precioMax ? Number(precioMax) : Infinity;
    const matchesPrecio = precioEv <= max;
    return matchesSearch && matchesCategoria && matchesPrecio;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Gestión de Eventos</h2>

        {/* Formulario de creación/edición */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border rounded p-2 w-full focus:outline-blue-400" required />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Descripción</label>
            <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="border rounded p-2 w-full focus:outline-blue-400" required />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Fecha</label>
            <input name="fecha" type="date" value={form.fecha} onChange={handleChange} className="border rounded p-2 w-full focus:outline-blue-400" required />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Categoría</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} className="border rounded p-2 w-full focus:outline-blue-400">
              {categorias.slice(1).map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Precio (CLP)</label>
            <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio" className="border rounded p-2 w-full focus:outline-blue-400" required />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Cupos disponibles</label>
            <input name="cupos_disponibles" type="number" value={form.cupos_disponibles} onChange={handleChange} placeholder="Cupos" className="border rounded p-2 w-full focus:outline-blue-400" required />
          </div>
          <div className="col-span-2 flex gap-4 mt-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-all">
              {editId !== null ? 'Actualizar' : 'Crear'} Evento
            </button>
            {editId !== null && <button type="button" onClick={() => { setForm(initialForm); setEditId(null); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancelar</button>}
          </div>
        </form>

        {message && <div className="mb-4 text-green-700 bg-green-100 border border-green-300 rounded p-2 text-center">{message}</div>}
        {error && <div className="mb-4 text-red-700 bg-red-100 border border-red-300 rounded p-2 text-center">{error}</div>}

        {/* Búsqueda y filtro */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Buscar por nombre" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="flex-1 border rounded p-2 focus:outline-blue-400"
          />
          
          <input type="number" placeholder="Precio máximo" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} className="border rounded p-2 focus:outline-blue-400"/>
          <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="border rounded p-2 focus:outline-blue-400">
            {categorias.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Tabla de eventos */}
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3 text-blue-800">Nombre</th>
                <th className="py-2 px-3 text-blue-800">Descripción</th>
                <th className="py-2 px-3 text-blue-800">Fecha</th>
                <th className="py-2 px-3 text-blue-800">Categoría</th>
                <th className="py-2 px-3 text-blue-800">Precio</th>
                <th className="py-2 px-3 text-blue-800">Cupos</th>
                <th className="py-2 px-3 text-blue-800">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-4">Cargando eventos...</td></tr>
              ) : filteredEventos.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-4">No hay eventos registrados.</td></tr>
              ) : (
                filteredEventos.map(ev => (
                  <tr key={ev.id} className="border-t hover:bg-blue-50 transition-all">
                    <td className="py-2 px-3">{ev.nombre}</td>
                    <td className="py-2 px-3">{ev.descripcion}</td>
                    <td className="py-2 px-3">{ev.fecha}</td>
                    <td className="py-2 px-3">{ev.categoria}</td>
                    <td className="py-2 px-3">${ev.precio}</td>
                    <td className="py-2 px-3">{ev.cupos_disponibles}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <button onClick={() => handleEdit(ev)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm">Editar</button>
                      <button onClick={() => handleDeleteEvento(ev.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Botón de volver al dashboard */}
        <div className="mt-6 text-center">
          <Link to="/dashboard">
            <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Volver al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
