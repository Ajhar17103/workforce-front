'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { FormField } from '@/types/common/FormField';
import { ProjectDto, ProjectParam } from '@/types/master-data/project.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { handleApiError } from '@/utils/errorHandler';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import FullView from './ProjectFullView';
import {
  projectFormSchema as baseSchema,
  projectTableSchema,
} from './ProjectSchema';
import Update from './ProjectUpdate';

export default function ProjectTable() {
  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { projects } = useAppSelector((state) => state.project);
  const [tableData, setTableData] = useState<ProjectDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<ProjectParam>({
    id: '0',
    name: '',
    description: '',
    startDate: '',
    endDate: null,
    assignUser: [],
  });
  const [itemView, setItemView] = useState<ProjectParam>({
    id: '0',
    name: '',
    description: '',
    startDate: '',
    endDate: null,
    assignUser: [],
  });
  const [modalFullViewShow, setModalFullViewShow] = useState<boolean>(false);
  const [viewschema, setViewSchema] = useState<FormField[]>(baseSchema);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const transformed: ProjectDto[] = projects?.map((p) => ({
      id: p.id,
      name: p.name,
      description: p?.description,
      startDate: p?.startDate,
      endDate: p?.endDate,
      status: p?.status,
      assignUser: p?.assignUser,
    }));
    setTableData(transformed);
  }, [projects]);

  const fulView = async (item: ProjectDto) => {
    setModalFullViewShow(true);

    const assignUser = users.map((user) => ({
      id: user.id,
      name: `${user.name}, ${user.designationName}`,
    }));

    const enumMap = {
      assignUser: assignUser,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setViewSchema(finalSchema);

    const viewData: ProjectParam = {
      id: item?.id,
      name: item?.name,
      description: item?.description,
      startDate: item?.startDate,
      endDate: item?.endDate,
      status: item?.status,
      assignUser: item?.assignUser,
    };

    setItemView(viewData);
  };

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
        toast.success('Project deleted successfully.');
        dispatch(fetchProjects());
      } catch (error) {
        console.error('Failed to delete:', error);
        handleApiError(error, 'Failed to delete project!');
      }
    }
  };

  const updateItem = (item: ProjectDto) => {
    setModalShow(true);

    const assignUser = users.map((user) => ({
      id: user.id,
      name: `${user.name}, ${user.designationName}`,
    }));

    const enumMap = {
      assignUser: assignUser,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setSchema(finalSchema);

    const updateData: ProjectParam = {
      id: item.id,
      name: item.name,
      description: item?.description,
      startDate: item?.startDate,
      endDate: item?.endDate,
      status: item?.status,
      assignUser: item?.assignUser,
    };

    setItemUpdate(updateData);
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={projectTableSchema}
        action={true}
        pagination={true}
        onView={fulView}
        onEdit={updateItem}
        onDelete={deleteItem}
      />

      {modalFullViewShow && (
        <CommonModal
          show={modalFullViewShow}
          onHide={() => setModalFullViewShow(false)}
          title="Project View"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <FullView
            schema={viewschema}
            itemUpdate={itemView}
            closeModal={() => setModalFullViewShow(false)}
          />
        </CommonModal>
      )}
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Project Update"
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
