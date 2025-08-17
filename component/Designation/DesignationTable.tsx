'use client';

import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDesignations } from '@/redux/slices/designationSlice';
import { FormField } from '@/types/common/FormField';
import {
  DesignationDto,
  DesignationParam,
} from '@/types/master-data/designationt.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { designationFormSchema as baseSchema } from './DesignationFormSchema';
import Update from './DesignationUpdate';

export default function DesignationTable() {
  const designationUrl = getMasterApiUrl('/designations');
  const departmentUrl = getMasterApiUrl('/departments');
  const dispatch = useAppDispatch();
  const { designations } = useAppSelector((state) => state.designation);
  const [tableData, setTableData] = useState<DesignationDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<DesignationParam>({
    id: 0,
    name: '',
  });
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const { deparments } = useAppSelector((state) => state.department);

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  useEffect(() => {
    if (!designations) return;

    const fetchDesignations = async () => {
      const transformed: DesignationDto[] = await Promise.all(
        designations.map(async (d) => ({
          id: d.id,
          departmentName: await getByEntityApi(
            departmentUrl,
            d.departmentId,
            'name',
          ),
          departmentId: d.departmentId,
          name: d.name,
        })),
      );
      setTableData(transformed);
    };

    fetchDesignations();
  }, [designations]);

  const updateItem = (item: DesignationDto) => {
    setModalShow(true);
    const departmentId = deparments.map((d) => ({
      id: d.id,
      name: d.name,
    }));

    const enumMap = {
      departmentId: departmentId,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setSchema(finalSchema);
    console.log('finalSchema', finalSchema);

    const updateData: DesignationParam = {
      id: item?.id,
      name: item?.name,
      departmentId: item?.departmentId,
    };

    setItemUpdate(updateData);
  };

  const deleteItem = async (item: DesignationDto) => {
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
        await deleteApi(designationUrl, item.id);
        toast.success('');
        Toast({
          message: 'Designation deleted successfully.!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchDesignations());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete role.');
      }
    }
  };

  const closeModal = () => {
    setModalShow(false);
  };

  console.log(deparments, 'departmentId');

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={[
          {
            label: 'Department Name',
            accessor: 'departmentName',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Name',
            accessor: 'name',
            sortable: true,
            searchable: true,
            align: 'start',
          },
        ]}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Designation Update"
          size="lg"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={schema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
