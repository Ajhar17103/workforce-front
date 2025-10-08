'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { FormField } from '@/types/common/FormField';
import { SprintDto, SprintParam } from '@/types/master-data/sprint.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { handleApiError } from '@/utils/errorHandler';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formSchema as baseSchema, tableSchema } from './SprintSchema';
import Update from './SprintUpdate';
import { fetchSprints } from '@/redux/slices/sprintSlice';

export default function SprintTable() {
  const sprintUrl = getMasterApiUrl('/sprints');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { sprints } = useAppSelector((state) => state.sprint);
  const [tableData, setTableData] = useState<SprintDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<SprintParam>({
    id: '0',
    name: '',
    projectId: '',
    startDate: '',
    endDate: '',
    workingDays: 0,
    dailyWorkingHrs: 0,
    totalSprintHrs: 0,
    sprintType: '',
  });
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSprints());
  }, [dispatch]);

  useEffect(() => {
    const transformed: SprintDto[] = sprints?.map((s) => ({
      id: s.id,
      name: s.name,
      projectId: s?.projectId,
      projectName: s.projectName,
      startDate: s?.startDate,
      endDate: s?.endDate,
      workingDays: s?.workingDays,
      dailyWorkingHrs: s?.dailyWorkingHrs,
      totalSprintHrs: s?.totalSprintHrs,
      sprintType: s?.sprintType,
    }));
    setTableData(transformed);
  }, [sprints]);

  const deleteItem = async (item: SprintDto) => {
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
        await deleteApi(sprintUrl, item.id);
        toast.success('sprint deleted successfully.');
        dispatch(fetchSprints());
      } catch (error) {
        console.error('Failed to delete:', error);
        handleApiError(error, 'Failed to delete sprint!');
      }
    }
  };

  const updateItem = (item: SprintDto) => {
    setModalShow(true);

    const projectId = projects.map((user) => ({
      id: user.id,
      name: user.name
    }));

    const enumMap = {
      projectId: projectId,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setSchema(finalSchema);

    const updateData: SprintParam = {
      id: item?.id,
      name: item?.name,
      projectId: item?.projectId,
      startDate: item?.startDate,
      endDate: item?.endDate,
      workingDays: item?.workingDays,
      dailyWorkingHrs: item?.dailyWorkingHrs,
      totalSprintHrs: item?.totalSprintHrs,
      sprintType: item?.sprintType,
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
        columns={tableSchema}
        action={true}
        pagination={true}
        onEdit={updateItem}
        onDelete={deleteItem}
      />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Sprint Update"
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
