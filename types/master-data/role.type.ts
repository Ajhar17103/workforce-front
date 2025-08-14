export interface RoleDto {
  id: number;
  name?: string;
}

export interface RoleParam {
  id: number;
  name?: string;
}

export interface RoleUpdateProps {
  schema?: any;
  itemUpdate?: RoleParam;
  closeModal: () => void;
}
