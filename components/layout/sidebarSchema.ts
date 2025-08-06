import { MenuItem } from "@/types/common/MenuItem";



export const sidebarSchema: MenuItem[] = [
  {
    id:1,
    name: "General Setup",
    nameBn: "General Setup",
    icon:"bi bi-gear-fill me-2",
    path:"",
    mainMenu:true,
    subMenu:false,
    ParentId:null
  },
  {
    id:2,
    name: "Mission",
    nameBn: "Mission",
    icon:"",
    path:"/general-setup/mission",
    mainMenu:false,
    subMenu:true,
    ParentId:1
  },
  {
    id:3,
    name: "Mission Details",
    nameBn: "Mission Details",
    icon:"",
    path:"/general-setup/mission-details",
    mainMenu:false,
    subMenu:true,
    ParentId:1
  },
  {
    id:4,
    name: "Office Basic",
    nameBn: "Office Basic",
    icon:"bi bi-people-fill me-2",
    path:"",
    mainMenu:true,
    subMenu:false,
    ParentId:null
  },
    {
    id:5,
    name: "Allowance",
    nameBn: "Allowance",
    icon:"",
    path:"/sailor-basic/allowance",
    mainMenu:false,
    subMenu:true,
    ParentId:4
  }
];