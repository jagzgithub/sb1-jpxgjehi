import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../Button';
import type { UserRole } from '../../../types/auth';

interface RoleChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentRole: UserRole;
  newRole: UserRole;
  userName: string;
}

export function RoleChangeDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentRole, 
  newRole,
  userName 
}: RoleChangeDialogProps) {
  if (!isOpen) return null;

  const isEscalation = newRole === 'admin' || 
    (currentRole === 'player' && newRole === 'captain');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className={`w-6 h-6 ${
            isEscalation ? 'text-yellow-500' : 'text-blue-500'
          }`} />
          <h3 className="text-lg font-semibold">Confirm Role Change</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to change {userName}'s role from{' '}
          <span className="font-medium">{currentRole}</span> to{' '}
          <span className="font-medium">{newRole}</span>?
        </p>

        {isEscalation && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              {newRole === 'admin' 
                ? 'This will grant full administrative access to the system.'
                : 'This will grant team management capabilities.'}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm Change
          </Button>
        </div>
      </div>
    </div>
  );
}