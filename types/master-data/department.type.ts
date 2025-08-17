export interface DepartmentDto {
  id: number;
  departmentName?: string;
  name?: string;
}

export interface DepartmentParam {
  id: number;
  name?: string;
}

export interface DepartmentUpdateProps {
  schema?: any;
  itemUpdate?: DepartmentParam;
  closeModal: () => void;
}
