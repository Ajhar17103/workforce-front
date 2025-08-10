import { MenuItem } from "@/types/common/MenuItem";



export const sidebarSchema: MenuItem[] = [
  {
    id:1,
    name: "Master Data",
    icon:"bi bi-gear-fill me-2",
    path:"",
    mainMenu:true,
    subMenu:false,
    ParentId:null
  },
  {
    id:2,
    name: "Users",
    icon:"",
    path:"/master-data/users",
    mainMenu:false,
    subMenu:true,
    ParentId:1
  },
  {
    id:3,
    name: "Menus",
    icon:"",
    path:"/master-data/menus",
    mainMenu:false,
    subMenu:true,
    ParentId:1
  },

];