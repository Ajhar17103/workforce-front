'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { FormField } from '@/types/common/FormField';
import { ProjectDto, ProjectParam } from '@/types/master-data/project.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  projectFormSchema as baseSchema,
  projectTableSchema,
} from './ProjectFormSchema';
import Update from './ProjectUpdate';

export default function ProjectTable() {
  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  const [tableData, setTableData] = useState<ProjectDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<ProjectParam>({
    id: '0',
    name: '',
    description: '',
    startDate: '',
    endDate: null,
    assignToUser: [],
  });
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const transformed: ProjectDto[] = projects?.map((m) => ({
      id: m.id,
      name: '',
      description: '',
      startDate: '',
      endDate: null,
      assignToUser: [],
    }));
    setTableData(transformed);
  }, [projects]);

  const deleteItem = async (item: ProjectDto) => {
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
        await deleteApi(projectUrl, item.id);
        toast.success('Menu deleted successfully.');
        dispatch(fetchMenus());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete menu.');
      }
    }
  };

  const updateItem = (item: ProjectDto) => {
    setModalShow(true);

    const parentItem = projects
      .filter((menu) => menu.parentId === null)
      .map((menu) => ({ id: menu.id, name: menu.name }));

    const enumMap = {
      parentId: parentItem,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    console.log(baseSchema);
    setSchema(finalSchema);

    const menuUpdateData: ProjectParam = {
      id: item.id,
      name: '',
      description: '',
      startDate: '',
      endDate: null,
      assignToUser: [],
    };

    setItemUpdate(menuUpdateData);
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={projectTableSchema}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Menu Update"
          size="xl"
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
