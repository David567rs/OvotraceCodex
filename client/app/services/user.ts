import api from './axios';

export const fetchUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};