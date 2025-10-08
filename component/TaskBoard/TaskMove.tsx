'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSprintsByProject } from '@/redux/slices/sprintSlice';
import { fetchTasks } from '@/redux/slices/taskSlice';
import { FormField, onChangeField } from '@/types/common/FormField';
import { TaskParam, TaskUpdateProps } from '@/types/task-board/task.type';
import { getMasterApiUrl, getTaskApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { moveFormSchema as moveSchema } from './TaskSchema';

export default function TaskMove({ closeModal, itemUpdate }: TaskUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskParam>({
    defaultValues: getDefaultValues<TaskParam>(itemUpdate),
  });
  const taskUrl = getTaskApiUrl('/tasks');
  const dispatch = useAppDispatch();
  const { projectSprints } = useAppSelector((state) => state.sprint);
  const [schema, setSchema] = useState<FormField[]>(moveSchema);

  useEffect(() => {
    if (itemUpdate?.projectId) {
      dispatch(fetchSprintsByProject(itemUpdate?.projectId));
    }
  }, [dispatch, itemUpdate]);

  useEffect(() => {
    if (projectSprints) {
      const sprintsId = projectSprints
        ?.filter((sprint: any) => sprint.id !== itemUpdate?.sprintId)
        ?.map((sprint: any) => ({
          id: sprint.id,
          name: sprint.name,
        }));

      const enumMap = {
        sprintId: sprintsId,
      };

      const finalSchema = setSchemaEnum(moveSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [projectSprints]);



  const handleFormSubmit = (data: TaskParam) => {
    const postData = {
      projectId: itemUpdate?.projectId,
      sprintId: data?.sprintId,
      userId: itemUpdate?.userId,
      name: itemUpdate?.name,
      description: itemUpdate?.description,
      taskTracker: itemUpdate?.taskTracker,
      priority: itemUpdate?.priority,
      taskType: 'PLANNED',
      startDate: itemUpdate?.startDate,
      estimatedTime: itemUpdate?.estimatedTime,
      taskStatus: itemUpdate?.taskStatus,
      // file:data?.file[0]
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${taskUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Task Moved Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchTasks());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to update task!');
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
