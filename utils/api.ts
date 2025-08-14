export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || '';

export const getAuthApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/${API_VERSION}/auth${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;
};
export const getUserApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/${API_VERSION}/user${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;
};

export const getMasterApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/master-data/${API_VERSION}${
    endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }`;
};
