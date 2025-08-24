'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import { fetchTasks } from '@/redux/slices/taskSlice';
import { FormField } from '@/types/common/FormField';
import { TaskDto, TaskParam } from '@/types/task-board/task.type';
import { getMasterApiUrl, getTaskApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { handleApiError } from '@/utils/errorHandler';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formSchema as baseSchema, tableSchema } from './TaskSchema';
import Update from './TaskUpdate';

export default function TaskTable() {
  const projectUrl = getMasterApiUrl('/projects');
  const sprintUrl = getMasterApiUrl('/sprints');
  const taskUrl = getTaskApiUrl('/tasks');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { sprints } = useAppSelector((state) => state.sprint);
  const { tasks } = useAppSelector((state) => state.task);
  const [tableData, setTableData] = useState<TaskDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<TaskParam>({
    id: '',
    projectId: '',
    sprintId: '',
    userId: '',
    name: '',
    description: '',
    taskTracker: '',
    priority: '',
    taskType: '',
    startDate: '',
    estimatedTime: '',
    taskStatus: '',
    file: '',
  });
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSprints());
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const transformed: TaskDto[] = tasks?.map((t) => ({
      id: t?.id,
      projectId: t?.projectId,
      projectName: t?.projectName,
      sprintId: t?.sprintId,
      sprintName: t?.sprintName,
      userId: t?.userId,
      userName: t?.userName,
      name: t?.name,
      description: t?.description,
      taskTracker: t?.taskTracker,
      priority: t?.priority,
      taskType: t?.taskType,
      sprintType: t?.sprintType,
      startDate: t?.startDate,
      estimatedTime: t?.estimatedTime,
      taskStatus: t?.taskStatus,
      fileName: t?.fileName,
      fileUrl: t?.fileUrl,
    }));
    setTableData(transformed);
  }, [tasks]);

  const deleteItem = async (item: TaskDto) => {
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
        await deleteApi(taskUrl, item.id);
        toast.success('task deleted successfully.');
        dispatch(fetchSprints());
      } catch (error) {
        console.error('Failed to delete:', error);
        handleApiError(error, 'Failed to delete task!');
      }
    }
  };

  const updateItem = async (item: TaskDto) => {
    let users = await getByEntityApi(
      `${projectUrl}/assign-user`,
      item?.projectId,
    );
    let sprints = await getByEntityApi(
      `${sprintUrl}/by-project`,
      item?.projectId,
    );

    const projectId = projects.map((user) => ({
      id: user.id,
      name: user.name,
    }));

    const usersId = users?.map((user: any) => ({
      id: user.id,
      name: `${user.name}, ${user.designationName}`,
    }));

    const sprintsId = sprints?.map((sprint: any) => ({
      id: sprint.id,
      name: sprint.name,
    }));

    const enumMap = {
      projectId: projectId,
      sprintId: sprintsId,
      userId: usersId,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    setSchema(finalSchema);

    const updateData: TaskParam = {
      id: item?.id,
      projectId: item?.projectId,
      sprintId: item?.sprintId,
      userId: item?.userId,
      name: item?.name,
      description: item?.description,
      taskTracker: item?.taskTracker,
      priority: item?.priority,
      taskType: item?.taskType,
      startDate: item?.startDate,
      estimatedTime: item?.estimatedTime,
      taskStatus: 'TO_Do',
      // file:item?.file[0]
    };

    setItemUpdate(updateData);
    setTimeout(() => {
      setModalShow(true);
    }, 200);
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={tableSchema}
        onEdit={updateItem}
        onDelete={deleteItem}
      />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Task Update"
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
