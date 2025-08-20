export interface DepartmentDto {
  id: string;
  departmentName?: string;
  name?: string;
}

export interface DepartmentParam {
  id: string;
  name?: string;
}

export interface DepartmentUpdateProps {
  schema?: any;
  itemUpdate?: DepartmentParam;
  closeModal: () => void;
}
