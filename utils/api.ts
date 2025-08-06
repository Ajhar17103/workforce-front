export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || '';

export const getAuthApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/auth/${API_VERSION}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
export const getUserApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/user/${API_VERSION}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const getUtilityApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/utility/${API_VERSION}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
