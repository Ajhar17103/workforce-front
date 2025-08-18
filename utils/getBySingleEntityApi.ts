import axiosInstance from '@/lib/axiosInstance';

export const getBySingleEntityApi = async <K extends keyof any>(
  url: string,
  id: string | number,
  field: K,
): Promise<any> => {
  try {
    const response = await axiosInstance.get(`${url}/${id}`);
    return response.data?.payload?.[field];
  } catch (error: any) {
    console.error(`Get API Error:`, error);
    throw error;
  }
};
