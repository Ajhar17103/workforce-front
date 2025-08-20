'use client';

import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDepartments } from '@/redux/slices/departmentSlice';
import { fetchRoles } from '@/redux/slices/roleSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { FormField, onChangeField } from '@/types/common/FormField';
import { UserDto, UserParam } from '@/types/master-data/user.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  userFormUpdatedSchema as baseSchema,
  userFormViewSchema as fullviewSchema,
  userTableSchema as tableColumn,
} from './UserFormSchema';
import UserFullView from './UserFullView';
import Update from './UserUpdate';

export default function UserTable() {
  const designationUrl = getMasterApiUrl('/designations');
  const roleUrl = getMasterApiUrl('/users');
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { departments } = useAppSelector((state) => state.department);
  const { roles } = useAppSelector((state) => state.role);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const [viewschema, setViewSchema] = useState<FormField[]>(fullviewSchema);
  const [tableData, setTableData] = useState<UserDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalFullViewShow, setModalFullViewShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<UserParam>({
    id: '0',
    name: '',
    designationId: '',
    roleId: '',
    dob: '',
    phone: '',
    email: '',
    currentAddress: '',
    presentAddress: '',
    bloodGroup: '',
    password: '',
    active: true,
  });
  const [itemView, setItemView] = useState<UserParam>({
    id: '0',
    name: '',
    designationId: '',
    roleId: '',
    dob: '',
    phone: '',
    email: '',
    currentAddress: '',
    presentAddress: '',
    bloodGroup: '',
    password: '',
    active: true,
  });
  const [onChangeType, setOnchangeType] = useState<onChangeField>({});

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDepartments());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    const transformed: UserDto[] = users?.map((m) => ({
      id: m?.id,
      name: m?.name,
      departmentId: m?.departmentId,
      departmentName: m?.departmentName,
      designationName: m?.designationName,
      designationId: m?.designationId,
      roleName: m?.roleName,
      roleId: m?.roleId,
      dob: m?.dob,
      phone: m?.phone,
      email: m?.email,
      currentAddress: m?.currentAddress,
      presentAddress: m?.presentAddress,
      bloodGroup: m?.bloodGroup,
      active: m?.active ? 'Active' : 'Inactive',
    }));
    setTableData(transformed);
  }, [users]);

  const handleDepartmentChange = async (id: any) => {
    let designation = await getByEntityApi(
      `${designationUrl}/by-department`,
      id,
    );

    const designationId = designation?.map((designation: any) => ({
      id: designation.id,
      name: designation.name,
    }));

    const enumMap = {
      designationId: designationId,
    };

    setSchema((prevSchema) => setSchemaEnum(prevSchema, enumMap));
  };

  const updateItem = async (item: UserDto) => {
    const departmentId = departments.map((department) => ({
      id: department.id,
      name: department.name,
    }));

    let designation = await getByEntityApi(
      `${designationUrl}/by-department`,
      item?.departmentId,
    );

    const designationId = designation?.map((designation: any) => ({
      id: designation.id,
      name: designation.name,
    }));

    const roleId = roles.map((role) => ({
      id: role.id,
      name: role.name,
    }));

    const enumMap = {
      departmentId: departmentId,
      roleId: roleId,
      designationId: designationId,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setSchema(finalSchema);
    setModalShow(true);

    const updateData: UserParam = {
      id: item?.id,
      name: item?.name,
      departmentId: item?.departmentId,
      designationId: item?.designationId,
      roleId: item?.roleId,
      dob: item?.dob,
      phone: item?.phone,
      email: item?.email,
      currentAddress: item?.currentAddress,
      presentAddress: item?.presentAddress,
      bloodGroup: item?.bloodGroup,
    };
    setItemUpdate(updateData);
  };

  const fulView = async (item: UserDto) => {
    setModalFullViewShow(true);
    const updateData: UserParam = {
      id: item?.id,
      name: item?.name,
      departmentId: item?.departmentName,
      designationId: item?.designationName,
      roleId: item?.roleName,
      dob: item?.dob,
      phone: item?.phone,
      email: item?.email,
      currentAddress: item?.currentAddress,
      presentAddress: item?.presentAddress,
      bloodGroup: item?.bloodGroup,
    };

    setItemView(updateData);
  };

  const deleteItem = async (item: UserDto) => {
    if (!item?.id) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        await deleteApi(roleUrl, item.id);
        toast.success('');
        Toast({
          message: 'User deleted successfully.!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchUsers());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete role.');
      }
    }
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={tableColumn}
        onView={fulView}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="User Update"
          size="lg"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={schema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
            onChangeType={onChangeType}
            setOnchangeType={setOnchangeType}
            handleDepartmentChange={handleDepartmentChange}
          />
        </CommonModal>
      )}

      {modalFullViewShow && (
        <CommonModal
          show={modalFullViewShow}
          onHide={() => setModalFullViewShow(false)}
          title="User View"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <UserFullView
            schema={fullviewSchema}
            itemUpdate={itemView}
            closeModal={() => setModalFullViewShow(false)}
          />
        </CommonModal>
      )}
    </div>
  );
}
