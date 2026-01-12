import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/auth/store/auth.store';

export const AdminHeader: React.FC = () => {

  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-end">
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};