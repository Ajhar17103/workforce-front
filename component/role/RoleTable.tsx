'use client';

import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchRoles } from '@/redux/slices/roleSlice';
import { RoleDto, RoleParam } from '@/types/master-data/role.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { roleFormSchema as baseSchema } from './RoleFormSchema';
import Update from './RoleUpdate';
import PermissionsPage from './permissions';

export default function RoleTable() {
  const roleUrl = getMasterApiUrl('/roles');
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.role);
  const [tableData, setTableData] = useState<RoleDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<RoleParam>({ id: 0, name: '' });
  const [showPermissionModal, setShowPermissionModal] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    const transformed: RoleDto[] = roles?.map((m) => ({
      id: m.id,
      name: m.name,
    }));
    setTableData(transformed);
  }, [roles]);

  const updatePermission = (item: RoleDto) => {
    console.log(item);
    setShowPermissionModal(true);
    const updateData: RoleParam = {
      id: item?.id,
      name: item?.name,
    };
    setItemUpdate(updateData);
  };

  const updateItem = (item: RoleDto) => {
    setModalShow(true);
    const updateData: RoleParam = {
      id: item?.id,
      name: item?.name,
    };
    setItemUpdate(updateData);
  };

  const deleteItem = async (item: RoleDto) => {
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
          message: 'Role deleted successfully.!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchRoles());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete role.');
      }
    }
  };

  const closeModal = () => {
    setModalShow(false);
  };

  console.log(tableData);

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={[
          {
            label: 'Name',
            accessor: 'name',
            sortable: true,
            searchable: true,
            align: 'start',
          },
        ]}
        onPermission={updatePermission}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title={'Role Update'}
          size="lg"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={baseSchema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}

      {showPermissionModal && (
        <CommonModal
          show={showPermissionModal}
          onHide={() => setShowPermissionModal(false)}
          title={`Permissions for ${itemUpdate?.name}`}
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <PermissionsPage
            role={itemUpdate}
            onClose={() => setShowPermissionModal(false)}
          />
        </CommonModal>
      )}
    </div>
  );
}
