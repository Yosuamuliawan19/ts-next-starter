import { createStandaloneToast } from '@chakra-ui/react';
import { BASE_URL, STATUS_TYPES } from '@constants';

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function cloneObject(obj) {
  if (null == obj || 'object' != typeof obj) return obj;
  const copy = obj.constructor();
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export type FetchServiceOptions = {
  requiresAuth: boolean;
  token?: string;
  payload?: any;
  onFailCallback?: () => void;
};

export type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const fetchService = async (
  url: string,
  requestMethod: HTTPRequestMethod,
  options: FetchServiceOptions
) => {
  const { payload, onFailCallback } = options;
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
      ...(options.requiresAuth && {
        Authorization: `${options.token}`,
      }),
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });
  const data = await response.json();
  if (response.status === 401 || response.status === 403) onFailCallback?.();
  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw new Error(error);
  }
  return { data, ok: true };
};

export const getLocalDate = (date: string) => {
  if (!date) {
    console.log(date);
    return undefined;
  }
  const localTime = new Date(date);
  const dateStr = `${localTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`;
  return dateStr;
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const checkExpired = (status: string) => {
  return status === STATUS_TYPES.CLOSED || status === STATUS_TYPES.ARCHIVED;
};

export const showSuccessMsg = (desc: string) => {
  const toast = createStandaloneToast();

  toast({
    title: 'Success',
    description: desc,
    status: 'success',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};
export const showErrorMsg = (desc: string) => {
  const toast = createStandaloneToast();

  toast({
    title: 'An error occured',
    description: desc,
    status: 'error',
    duration: 2000,
    isClosable: true,
    position: 'top',
  });
};

export const getFullName = (value) => {
  return `${value?.firstName} ${value?.lastName}`;
};

export const truncate = (input) =>
  input.length > 150 ? `${input.substring(0, 150)}...` : input;
