import { ToastOptions } from "react-toastify";

type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessageParam {
  message: string;
  type?: MessageType;
  options?: ToastOptions;
}
