import React, { useState } from 'react';
import { History } from 'lucide-react';
import { Button } from '../../Button';
import { format } from 'date-fns';
import { useRoleHistory } from '../../../hooks/admin/useRoleHistory';

interface RoleHistoryButtonProps {
  userId: string;
  userName: string;
}

export function RoleHistoryButton({ userId, userName }: RoleHistoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { history, isLoading } = useRoleHistory(userId);

  if (isLoading) return null;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="p-2"
        title="View role history"
      >
        <History className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Role History for {userName}</h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((entry) => (
                <div 
                  key={entry.id} 
                  className="border-l-4 border-indigo-500 pl-4 py-2"
                >
                  <p className="text-sm text-gray-600">
                    Changed from <span className="font-medium">{entry.oldRole}</span>{' '}
                    to <span className="font-medium">{entry.newRole}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(entry.changedAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}