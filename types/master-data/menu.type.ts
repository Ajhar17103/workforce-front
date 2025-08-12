export interface MenuTables {
  id: number;
  name: string;
  menuType: 'MAIN' | 'SUB';
  parentId?: string | null;
  parentMenu?: string | null;
  icon: string;
  path: string | null;
}

export interface MenuParam {
  id: number;
  menuName?: string;
  subName?: string;
  menuType: 'MAIN' | 'SUB';
  icon: string;
  path: string | null;
  parentId?: string | null;
}

export interface MenuUpdateProps {
  itemUpdate?: MenuTables;
  closeModal: () => void;
}
