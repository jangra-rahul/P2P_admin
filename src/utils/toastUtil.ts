// utils/toastUtil.ts
import { toast } from 'react-toastify';

export const toastUtil = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
};
