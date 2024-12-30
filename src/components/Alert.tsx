import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />
  };

  return (
    <div className={`flex items-center gap-2 p-4 border rounded-lg ${styles[type]}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}