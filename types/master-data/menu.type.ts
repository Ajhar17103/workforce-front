// types/mission.ts

export interface MenuDto {
  id: string;
  version: number | null;
  deleted: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  ipAddress: string | null;
  name: string;
  missionDescription: string;
  raisingDate: string;
  missionCountryDto: any | null;
  startDate: string;
  endDate: string;
}

export interface MenuTables {
  id: number;
  name: string;
  menuType: string;
  parentMenu: string;
  icon:string,
  path: string;
}


export interface MenuParam {
  menuName?: string;
  subMenuName?:string
  menuType: "MENUTITLE"|"MAINMENU"|"SUBMENU";
  icon: string;
  path: string;
  parentId: string;
}

export interface MenuUpdateProps {
  itemUpdate?: MenuTables;
  closeModal: () => void;
};