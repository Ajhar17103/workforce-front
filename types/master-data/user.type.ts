export interface UserDto {
  id: string;
  name: string;
  departmentId?: string | any;
  departmentName?: string;
  designationName?: string;
  designationId: string;
  roleName?: string;
  roleId: string;
  dob: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  active?: 'Active' | 'Inactive';
}

export interface UserParam {
  id: string;
  name: string;
  departmentId?: string;
  designationId?: string;
  roleId?: string;
  dob: string;
  phone: string;
  email: string;
  currentAddress: string;
  presentAddress: string;
  bloodGroup: string;
  password?: string;
  active?: true | false;
}

export interface UserUpdateProps {
  schema?: any;
  itemUpdate?: UserParam;
  closeModal: () => void;
  onChangeType?: any;
  setOnchangeType?: any;
  handleDepartmentChange?: (id: any) => void | Promise<void>;
}
