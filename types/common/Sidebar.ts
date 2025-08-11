export type Sidebar = {
  id: number;
  name: string;
  icon?:string;
  path: string | null;
  menuType:"MAINMENU"|"SUBMENU",
  parentId?: number | null;
};
