export interface UserDto {
  id: number;
  name?: string;
  designationId: string;
  roleId: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  profile: string;
}

export interface UserParam {
  id: number;
  name?: string;
  designationId: string;
  roleId: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  profile: string;
}

export interface UserUpdateProps {
  schema?: any;
  itemUpdate?: UserParam;
  closeModal: () => void;
}
