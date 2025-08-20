export interface RoleDto {
  id: string;
  name?: string;
}

export interface RoleParam {
  id: string;
  name?: string;
}

export interface RoleUpdateProps {
  schema?: any;
  itemUpdate?: RoleParam;
  closeModal: () => void;
}
