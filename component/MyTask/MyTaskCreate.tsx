'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import { fetchTaskByUserId } from '@/redux/slices/taskSlice';
import { FormField, onChangeField } from '@/types/common/FormField';
import { TaskParam, TaskUpdateProps } from '@/types/task-board/task.type';
import { getMasterApiUrl, getTaskApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './MyTaskSchema';

export default function TaskCreate({ closeModal }: TaskUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskParam>();
  const user_id = getSessionStorage('user_id');
  const sprintUrl = getMasterApiUrl('/sprints');
  const taskUrl = getTaskApiUrl('/tasks');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { sprints } = useAppSelector((state) => state.sprint);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const [onChangeType, setOnchangeType] = useState<onChangeField>({});

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSprints());
  }, [dispatch]);

  useEffect(() => {
    if (projects) {
      const projectId = projects.map((user) => ({
        id: user.id,
        name: user.name,
      }));

      const enumMap = {
        projectId: projectId,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [projects, sprints]);

  useEffect(() => {
    if (onChangeType?.type === 'handleProjectChange' && onChangeType?.id) {
      handleProjectChange(onChangeType?.id);
    }
  }, [onChangeType]);

  const handleProjectChange = async (id: any) => {
    let sprints = await getByEntityApi(`${sprintUrl}/by-project`, id);

    const sprintsId = sprints?.map((sprint: any) => ({
      id: sprint.id,
      name: sprint.name,
    }));

    const enumMap = {
      sprintId: sprintsId,
    };

    setSchema((prevSchema) => setSchemaEnum(prevSchema, enumMap));
  };

  const handleFormSubmit = (data: TaskParam) => {
    console.log(data);
    const postData = {
      projectId: data?.projectId,
      sprintId: data?.sprintId,
      userId: user_id,
      name: data?.name,
      description: data?.description,
      taskTracker: data?.taskTracker,
      priority: data?.priority,
      taskType: 'UNPLANNED',
      startDate: data?.startDate,
      estimatedTime: data?.estimatedTime,
      taskStatus: 'TO_DO',
      // file:data?.file[0]
    };
    console.log('postData', postData);
    if (user_id) {
      axiosInstance
        .post(taskUrl, postData)
        .then((response) => {
          Toast({
            message: 'Task Create Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchTaskByUserId(user_id));
          reset();
          closeModal();
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create task!');
          console.error(error);
        });
    }
  };

  const handleClear = () => reset();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-4 rounded-bottom border"
    >
      <div className="row g-3">
        <Form
          schema={schema}
          register={register}
          control={control}
          errors={errors}
          resetField={resetField}
          setOnchangeType={setOnchangeType}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
        <Button variant="danger" onClick={() => handleClear()}>
          <i className="bi bi-x" /> Cancel
        </Button>

        <PermissionGuard action="add">
          <Button variant="primary" type="submit">
            <i className="bi bi-floppy2-fill" /> Save
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
