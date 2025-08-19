export interface UserDto {
  id: number;
  name?: string;
  designationId: string;
  roleId: string;
  dob: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  profileIcon: string;
  password: string;
}

export interface UserParam {
  id: number;
  name?: string;
  designationId: string;
  roleId: string;
  dob: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  profileIcon: string;
  password: string;
}

export interface UserUpdateProps {
  schema?: any;
  itemUpdate?: UserParam;
  closeModal: () => void;
}
