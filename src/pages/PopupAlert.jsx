import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopupAlert = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Adjust the duration as needed
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [message]);

  return (
    <div>
      {/* Place the ToastContainer component in your root component */}
      <ToastContainer />
    </div>
  );
};

export default PopupAlert;
