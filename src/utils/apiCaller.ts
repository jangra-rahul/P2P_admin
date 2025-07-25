import axios, { AxiosRequestConfig, Method, AxiosError } from 'axios';
import Router from 'next/router';
import { toastUtil } from './toastUtil';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiCaller<T>(
  method: Method,
  url: string,
  data?: Record<string, unknown> | FormData
): Promise<T> {
  const isFormData = data instanceof FormData;

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const config: AxiosRequestConfig = {
    method,
    url: `${baseUrl}/${url}`,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(method !== 'get' && { data }),
    ...(method === 'get' && data && { params: data }),
  };

  try {
    const response = await axios<T>(config);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const status = err.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      Router.push('/auth/login');
        toastUtil.error('Session expired. Please log in again.');
    } else {
      toastUtil.error(err.response?.data?.message || 'Something went wrong');
    }

    throw err;
  }
}
