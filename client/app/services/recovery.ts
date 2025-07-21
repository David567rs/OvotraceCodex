import api from './axios';

export const enviarCorreoRecuperacion = async (email: string) => {
  return await api.post('/forgot-password', { email });
};
