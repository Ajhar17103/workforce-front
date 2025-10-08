'use client';

import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDepartments } from '@/redux/slices/departmentSlice';
import {
  DepartmentDto,
  DepartmentParam,
} from '@/types/master-data/department.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { departmentFormSchema as baseSchema } from './DepartmentFormSchema';
import Update from './DepartmentUpdate';

export default function DepartmentTable() {
  const departmentUrl = getMasterApiUrl('/departments');
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.department);
  const [tableData, setTableData] = useState<DepartmentDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<DepartmentParam>({
    id: '0',
    name: '',
  });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    const transformed: DepartmentDto[] = departments?.map((d) => ({
      id: d.id,
      name: d.name,
    }));
    setTableData(transformed);
  }, [departments]);

  const updateItem = (item: DepartmentDto) => {
    setModalShow(true);
    const updateData: DepartmentParam = {
      id: item?.id,
      name: item?.name,
    };
    setItemUpdate(updateData);
  };

  const deleteItem = async (item: DepartmentDto) => {
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
        await deleteApi(departmentUrl, item.id);
        toast.success('');
        Toast({
          message: 'Department deleted successfully.!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchDepartments());
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
        action={true}
        pagination={true}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Department Update"
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
    </div>
  );
}
