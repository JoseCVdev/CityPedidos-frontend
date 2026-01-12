import { pedidosCityApi } from '@/api/pedidosCityApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no encontrado');

  try {
    const { data } = await pedidosCityApi.post<AuthResponse>('/auth/refresh-token');

    localStorage.setItem('token', data.data.token);

    return data;
    
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    throw new Error('Token expirado o no válido');
  }
};