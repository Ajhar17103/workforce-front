export interface MenuDto {
  id: number;
  menuType?: 'MAIN' | 'SUB';
  menuName?: String;
  subName?: string;
  parentId?: string | null;
  parentMenu?: string;
  name?: string;
  icon?: string | null;
  path: string | null;
}

export interface MenuPermissionDto {
  id: string;
  parentId: string | null;
  parentMenu: string;
  name: string;
  icon: string | null;
  path: string | null;
  view: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
}

export interface MenuParam {
  id: number;
  parentId?: string | null;
  menuName?: string;
  subName?: string;
  icon?: string | null;
  path?: string | null;

  menuType?: 'MAIN' | 'SUB' | string;
}

export interface MenuUpdateProps {
  schema?: any;
  itemUpdate?: MenuParam;
  closeModal: () => void;
}
