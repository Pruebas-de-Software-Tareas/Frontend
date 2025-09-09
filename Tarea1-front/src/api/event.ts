import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface EventoPayload {
  nombre: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  precio: number;
  cupos_disponibles: number;
}

// Obtener todos los eventos
export const fetchEventos = async (token: string) => {
  const res = await axios.get(`${API_URL}/eventos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Crear un evento
export const createEvento = async (token: string, evento: EventoPayload) => {
  const res = await axios.post(`${API_URL}/eventos`, evento, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Actualizar un evento
export const updateEvento = async (token: string, id: number, evento: EventoPayload) => {
  const res = await axios.put(`${API_URL}/eventos/${id}`, evento, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Eliminar un evento
export const deleteEvento = async (token: string, id: number) => {
  const res = await axios.delete(`${API_URL}/eventos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
