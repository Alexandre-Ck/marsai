import { apiFetch } from './api';

export const login = credentials => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = userData => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
