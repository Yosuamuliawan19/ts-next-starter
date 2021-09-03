import { BASE_URL } from '@constants';
export type FetchServiceOptions = {
  requiresAuth: boolean;
  token?: string;
  payload?: any;
  onFailCallback?: () => void;
};
// const BASE_URL = 'http://localhost:2000/v1/';
export type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const fetchService = async (
  url: string,
  requestMethod: HTTPRequestMethod,
  options: FetchServiceOptions
) => {
  if (typeof window === 'undefined') {
    return;
  }
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const { onFailCallback } = options;
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.requiresAuth && {
        Authorization: `${accessToken?.token}`,
      }),
    },
    ...(options?.payload && { body: JSON.stringify(options?.payload) }),
  });
  const data = await response.json();
  if (response.status === 401 || response.status === 403) onFailCallback?.();
  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw new Error(error);
  }
  return { data, ok: true };
};
