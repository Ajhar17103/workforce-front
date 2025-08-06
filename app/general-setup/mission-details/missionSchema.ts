type Field = {
  column: number;
  align: string;
  label: string;
  fieldName: string;
  dataType: "input" | "dropdown" | "checkbox" | "date";
  action: string | null;
  defaultValue: any;
  isEnum: boolean;
  enum: string[];
  isRequired: boolean;
};

export const missionSchema : Field[] = [
  {
    column: 12,
    align: "default",
    label: "Name",
    fieldName: "name",
    dataType: "input",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: true,
  },
    {
    column: 12,
    align: "default",
    label: "Mission Description",
    fieldName: "missionDescription",
    dataType: "input",
    action: null,
    defaultValue: "",
    isEnum: false,
    enum: [],
    isRequired: true,
  },
  
  {
    column: 12,
    align: "default",
    label: "Raising Date",
    fieldName: "raisingDate",
    dataType: "date",
    action: null,
    defaultValue: false,
    isEnum: false,
    enum: [],
    isRequired: true,
  },
  {
    column: 12,
    align: "default",
    label: "Mission Country",
    fieldName: "missionCountryId",
    dataType: "dropdown",
    action: null,
    defaultValue: false,
    isEnum: true,
    enum: ["Bangladesh","USA","UK","CANADA"],
    isRequired: true,
  },
  {
    column: 12,
    align: "default",
    label: "Start Date",
    fieldName: "startDate",
    dataType: "date",
    action: null,
    defaultValue: false,
    isEnum: false,
    enum: [],
    isRequired: true,
  },
  {
    column: 12,
    align: "default",
    label: "End Date",
    fieldName: "endDate",
    dataType: "date",
    action: null,
    defaultValue: false,
    isEnum: false,
    enum: [],
    isRequired: true,
  },
  {
    column: 12,
    align: "default",
    label: "Consequence Of Medical Category",
    fieldName: "consequenceOfMedicalCategory",
    dataType: "checkbox",
    action: null,
    defaultValue: false,
    isEnum: false,
    enum: [],
    isRequired: false,
  },
];
