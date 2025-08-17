export interface DesignationDto {
  id: number;
  departmentName?: string;
  departmentId?: string;
  name?: string;
}

export interface DesignationParam {
  id: number;
  departmentId?: string;
  name?: string;
}

export interface DesignationUpdateProps {
  schema?: any;
  itemUpdate?: DesignationParam;
  closeModal: () => void;
}
