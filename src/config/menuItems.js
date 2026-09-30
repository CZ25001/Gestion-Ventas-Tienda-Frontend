import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';

export const menuItems = [
  {
    path: '/productos',
    label: 'Productos',
    icon: StoreIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/inventario',
    label: 'Inventario',
    icon: InventoryIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/ventas',
    label: 'Ventas',
    icon: ShoppingCartIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/clientes',
    label: 'Clientes',
    icon: PersonIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/empleados',
    label: 'Empleados',
    icon: BadgeIcon,
    roles: ['ADMIN'],
  },
  {
    path: '/proveedores',
    label: 'Proveedores',
    icon: LocalShippingIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/usuarios',
    label: 'Usuarios',
    icon: PeopleIcon,
    roles: ['ADMIN'],
  },
];