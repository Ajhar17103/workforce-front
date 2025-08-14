import { ToastMessageParam } from '@/types/common/ToastMessageParam';
import { toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = ({
  message,
  type = 'info',
  autoClose = 2000,
  theme = 'light',
  options,
}: ToastMessageParam & {
  autoClose?: number;
  theme?: 'light' | 'dark' | 'colored';
}) => {
  const toastType: TypeOptions = type;

  toast(message, {
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    type: toastType,
    ...options,
  });
};
