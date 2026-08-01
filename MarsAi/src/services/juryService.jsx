import { apiFetch } from './api.jsx';

export const getJury = () => apiFetch('/api/admin/jury');

export const createJury = juryData =>
  apiFetch('/api/admin/jury', {
    method: 'POST',
    body: JSON.stringify(juryData),
  });

export const updateJury = (id, juryData) =>
  apiFetch(`/api/admin/jury/${id}`, {
    method: 'PUT',
    body: JSON.stringify(juryData),
  });

export const deleteJury = id =>
  apiFetch(`/api/admin/jury/${id}`, {
    method: 'DELETE',
  });
