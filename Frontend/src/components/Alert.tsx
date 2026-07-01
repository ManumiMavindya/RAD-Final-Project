import React from 'react';

type AlertProps = {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
};

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const styles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center p-4 border-l-4 rounded shadow-lg ${styles[type]}`}>
      <span className="mr-4">{message}</span>
      <button onClick={onClose} className="font-bold hover:opacity-75">×</button>
    </div>
  );
};

export default Alert;