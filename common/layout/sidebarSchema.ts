import { Sidebar } from '../../types/common/Sidebar';

export const sidebarSchema: Sidebar[] = [
  {
    id: 11,
    name: 'Dashboard',
    icon: 'bi bi-speedometer2 me-2',
    path: '/',
    menuType: 'MAIN',
    parentId: null,
  },
  {
    id: 1,
    name: 'Master Data',
    icon: 'bi bi-gear-fill me-2',
    path: null,
    menuType: 'MAIN',
    parentId: null,
  },
  {
    id: 3,
    name: 'Menus',
    icon: '',
    path: '/master-data/menus',
    menuType: 'SUB',
    parentId: 1,
  },
  {
    id: 2,
    name: 'Users',
    icon: '',
    path: '/master-data/users',
    menuType: 'SUB',
    parentId: 1,
  },
  {
    id: 55,
    name: 'Task',
    icon: 'bi bi-gear-fill me-2',
    path: '/task',
    menuType: 'MAIN',
    parentId: null,
  },
];
