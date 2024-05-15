
import { FC, useEffect } from 'react';

import { useAppSelector } from '../hooks/useAppSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification: FC<{ mode: 'dark' | 'light' }> = ({ mode }) => {
  const { notifications } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    if (notifications.length) {
      const { type, message } = notifications[notifications.length - 1];
      toast(message, {
        type: type,
        theme: mode,
      });
    }
  }, [notifications]);

  return (
    <ToastContainer
      position='bottom-left'
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  );
};

export default Notification;