export type MenuItem = {
  id: number;
  name: string;
  nameBn: string;
  icon:string;
  path: string;
  mainMenu: boolean;
  subMenu: boolean;
  ParentId: number | null;
};
