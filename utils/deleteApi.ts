import axiosInstance from "@/lib/axiosInstance";


export const deleteApi = async (url: string, id: string | number) => {
  try {
    const response = await axiosInstance.delete(`${url}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete API Error:", error);
    throw error;
  }
};
