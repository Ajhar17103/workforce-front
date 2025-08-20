import { Toast } from '@/common/messages/toast';

export const handleApiError = (
  error: any,
  fallbackMessage = 'Something went wrong!',
) => {
  console.error('API Error:', error);

  let message = fallbackMessage;

  if (error.response?.data) {
    const { message: apiMessage, status } = error.response.data;

    if (apiMessage) {
      message = apiMessage;
    } else if (status) {
      message = `Request failed with status ${status}`;
    }
  } else if (error.request) {
    // No response from server
    message = 'No response from server. Please try again.';
  } else if (error.message) {
    // Axios or JS error
    message = error.message;
  }

  Toast({
    message,
    type: 'error',
    autoClose: 2000,
    theme: 'colored',
  });

  throw new Error(message); // optional rethrow
};
