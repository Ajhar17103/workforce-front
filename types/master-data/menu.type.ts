export interface MenuDto {
  id: number;
  menuType: 'MAIN' | 'SUB';
  parentId?: string | null;
  parentMenu?: string | null;
  name: string;
  icon: string;
  path: string | null;
}

export interface MenuParam {
  id: number;
  menuType: 'MAIN' | 'SUB';
  parentId?: string | null;
  menuName?: string;
  subName?: string;
  icon: string;
  path: string | null;
}

export interface MenuUpdateProps {
  itemUpdate?: MenuParam;
  closeModal: () => void;
}
