import { Link, useLocation } from 'react-router';
import { Users, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { pathname } = useLocation();

  const { usuario, menu } = useAuthStore();

  // const menuItems = [
  //   { icon: Users, label: 'Gestión Clientes', to: '/pages/gestion-clientes' },
  //   { icon: ShoppingCart, label: 'Gestión Pedidos', to: '/pages/gestion-pedidos' }
  // ];

  const menuItems = menu;

  const isActiveRoute = (to: string) => pathname == to;

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-18' : 'w-64'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-18">
        {!isCollapsed && 
            <img 
                src="https://s3.amazonaws.com/media.greatplacetowork.com/peru/best-workplaces-in-peru/2023/3-mas-de-1000/07-atlantic-city/logo-01.png" 
                alt="Logo" 
                className="mb-2 w-70 h-24 object-contain"
            />}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems?.map((item, index) => {
            let Icon;

            switch (item.icono) {
              case "shopping-cart": 
                Icon = ShoppingCart;
                break;
              case "users":
                Icon = Users;
                break;
              default:
                Icon = null;
                break;
            }
            
            return (
              <li key={index}>
                <Link
                  to={item.url}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActiveRoute(item.url)
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {Icon && <Icon size={20} className="flex-shrink-0" />}
                  {!isCollapsed && <span className="font-medium">{item.nombre}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/016/766/342/small/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-transparent-background-png.png"
                alt="Usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{usuario?.nombreUsuario}</p>
              <p className="text-xs text-gray-500 truncate">{usuario?.descripcionRol}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
