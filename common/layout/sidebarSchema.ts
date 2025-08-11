import { Sidebar } from "../../types/common/Sidebar";


export const sidebarSchema: Sidebar[] = [
  {
    id:1,
    name: "Master Data",
    icon:"bi bi-gear-fill me-2",
    path:null,
    menuType:"MAINMENU",
    parentId:null
  },
   {
    id:3,
    name: "Menus",
    icon:"",
    path:"/master-data/menus",
    menuType:"SUBMENU",
    parentId:1
  },
  {
    id:2,
    name: "Users",
    icon:"",
    path:"/master-data/users",
    menuType:"SUBMENU",
    parentId:1
  },
  {
    id:55,
    name: "Task",
    icon:"bi bi-gear-fill me-2",
    path:"/task",
    menuType:"MAINMENU",
    parentId:null,
    }
];