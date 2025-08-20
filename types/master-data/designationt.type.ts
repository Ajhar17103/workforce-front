export interface DesignationDto {
  id: string;
  departmentName?: string;
  departmentId?: string;
  name?: string;
}

export interface DesignationParam {
  id: string;
  departmentId?: string;
  name?: string;
}

export interface DesignationUpdateProps {
  schema?: any;
  itemUpdate?: DesignationParam;
  closeModal: () => void;
}
