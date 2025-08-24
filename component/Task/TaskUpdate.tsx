'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchTasks } from '@/redux/slices/taskSlice';
import { TaskParam, TaskUpdateProps } from '@/types/task-board/task.type';
import { getTaskApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function TaskUpdate({
  schema,
  itemUpdate,
  closeModal,
}: TaskUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<TaskParam>({
    defaultValues: getDefaultValues<TaskParam>(itemUpdate),
  });

  const taskUrl = getTaskApiUrl('/tasks');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: TaskParam) => {
    const postData = {
      projectId: data?.projectId,
      sprintId: data?.sprintId,
      userId: data?.userId,
      name: data?.name,
      description: data?.description,
      taskTracker: data?.taskTracker,
      priority: data?.priority,
      taskType: 'PLANNED',
      startDate: data?.startDate,
      estimatedTime: data?.estimatedTime,
      taskStatus: itemUpdate?.taskStatus,
      // file:data?.file[0]
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${taskUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Task Updated Successful!',
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
  console.log('schema', schema);
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white rounded-bottom"
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
        <Button variant="danger" onClick={() => closeModal()}>
          <i className="bi bi-x" /> Cancel
        </Button>
        <PermissionGuard action="update">
          <Button variant="primary" type="submit">
            <i className="bi bi-floppy2-fill" /> Update
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
