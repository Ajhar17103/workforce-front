export type Sidebar = {
  id: number;
  name: string;
  icon?: string;
  path: string | null;
  menuType: 'MAIN' | 'SUB';
  parentId?: number | null;
};
