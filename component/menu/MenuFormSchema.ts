import { FormField } from "@/types/common/FormField";

export const menuFormSchema: FormField[] = [
  {
    column: 4,
    align: "default",
    label: "Menu Type",
    labelVisibility: "visible",
    fieldName: "menuType",
    dataType: "dropdown",
    action: null,
    defaultValue: "",
    isEnum: true,
    enum: [
      { id: "MAINMENU", name: "Main Menu" },
      { id: "SUBMENU", name: "Sub Menu" }
    ],
    isRequired: true,
  },
  {
    column: 4,
    align: "default",
    label: "Menu Name",
    labelVisibility: "visible",
    fieldName: "menuName",
    dataType: "text",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: true,
    showWhen: [{ field: "menuType", value: "MAINMENU" },{ field: "menuType", value: "MENUTITLE" }]
  },
  {
    column: 4,
    align: "default",
    label: "Menu List",
    labelVisibility: "visible",
    fieldName: "parentId",
    dataType: "dropdown",
    action: null,
    defaultValue: "",
    isEnum: true,
    enum: [
      { id: "1", name: "Users" },
      { id: "2", name: "Role and Permissions" }
    ],
    isRequired: true,
    showWhen: [{ field: "menuType", value: "SUBMENU" }]
  },
  {
    column: 4,
    align: "default",
    label: "Sub-Menu Name",
    labelVisibility: "visible",
    fieldName: "SubMenuName",
    dataType: "text",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: true,
    showWhen: [{ field: "menuType", value: "SUBMENU" }]
  },
  {
    column: 4,
    align: "default",
    label: "Icon",
    labelVisibility: "visible",
    fieldName: "icon",
    dataType: "text",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: true,
    showWhen: [{ field: "menuType", value: "MAINMENU" }]
  },
  {
    column: 4,
    align: "default",
    label: "path",
    labelVisibility: "visible",
    fieldName: "path",
    dataType: "text",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: false,
    showWhen: [{ field: "menuType", value: "SUBMENU" },{ field: "menuType", value: "MAINMENU" }]
  }
];

