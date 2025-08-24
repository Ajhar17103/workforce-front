'use client';

import CustomButton from '@/common/Buttons/Button';
import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTaskByUserId } from '@/redux/slices/taskSlice';
import { TaskDto, TaskParam } from '@/types/task-board/task.type';
import { getTaskApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Complete from './MyTaskComplete';
import {
  formCompleteSchema,
  formViewSchema,
  tableSchema,
} from './MyTaskSchema';
import View from './MyTaskView';

export default function MyTaskTable() {
  const taskUrl = getTaskApiUrl('/tasks');
  const user_id = getSessionStorage('user_id');
  const [activeTab, setActiveTab] = useState<
    'TO_DO' | 'IN_PROGRESS' | 'HOLD' | 'COMPLETED'
  >('TO_DO');
  const dispatch = useAppDispatch();
  const { userTasks } = useAppSelector((state) => state.task);
  const [tableData, setTableData] = useState<TaskDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalViewShow, setModalViewShow] = useState<boolean>(false);
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

  useEffect(() => {
    if (user_id) {
      dispatch(fetchTaskByUserId(user_id));
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    const transformed: TaskDto[] = (userTasks || []).map((t: any) => ({
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
    const filtered = transformed.filter(
      (task) => task.taskStatus === activeTab,
    );
    setTableData(filtered);
  }, [userTasks, activeTab]);

  const onProgress = async (item: TaskDto) => {
    if (!item?.id) return;

    const updateData: TaskParam = {
      id: item.id,
      projectId: item.projectId,
      sprintId: item.sprintId,
      userId: item.userId,
      name: item.name,
      description: item.description,
      taskTracker: item.taskTracker,
      priority: item.priority,
      taskType: item.taskType,
      startDate: item.startDate,
      estimatedTime: item.estimatedTime,
      taskStatus: 'IN_PROGRESS',
    };

    const result = await Swal.fire({
      title: 'Move task to In Progress?',
      text: `Task will be moved from ${
        activeTab === 'HOLD' ? 'Hold' : 'To-Do'
      } to In Progress.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, move it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.put(`${taskUrl}/${item.id}`, updateData);

      Toast({
        message: `Task  moved to In Progress!`,
        type: 'success',
        autoClose: 1500,
        theme: 'colored',
      });

      if (user_id) {
        dispatch(fetchTaskByUserId(user_id));
      }
      setActiveTab('IN_PROGRESS');
    } catch (error) {
      console.error('Failed to update task:', error);
      handleApiError(error, `Failed to move "${item.name}" to In Progress!`);
    }
  };

  const onHold = async (item: TaskDto) => {
    if (!item?.id) return;

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
      taskStatus: 'HOLD',
    };

    const result = await Swal.fire({
      title: 'Move task to Hold?',
      text: `Task will be moved from In Progress to Hold.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, move it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.put(`${taskUrl}/${item.id}`, updateData);

        Toast({
          message: `Task  moved to Hold!`,
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });

        if (user_id) {
          dispatch(fetchTaskByUserId(user_id));
        }
        setActiveTab('HOLD');
      } catch (error) {
        console.error('Failed to update task:', error);
        handleApiError(error, `Failed to move "${item.name}" to Hold!`);
      }
    }
  };

  const onCompleted = async (item: TaskDto) => {
    if (!item?.id) return;

    const updateData: TaskDto = {
      id: item?.id,
      projectId: item?.projectId,
      projectName: item?.projectName,
      sprintId: item?.sprintId,
      sprintName: item?.sprintName,
      userId: item?.userId,
      userName: item?.userName,
      name: item?.name,
      description: item?.description,
      taskTracker: item?.taskTracker,
      priority: item?.priority,
      taskType: item?.taskType,
      sprintType: item?.sprintType,
      startDate: item?.startDate,
      estimatedTime: item?.estimatedTime,
      taskStatus: item?.taskStatus,
      fileName: item?.fileName,
      fileUrl: item?.fileUrl,
    };

    setItemUpdate(updateData);
    setModalShow(true);
  };

  const closeCompleteModal = () => {
    setModalShow(false);
  };
  const onView = (item: TaskDto) => {
    const updateData: TaskDto = {
      id: item?.id,
      projectId: item?.projectId,
      projectName: item?.projectName,
      sprintId: item?.sprintId,
      sprintName: item?.sprintName,
      userId: item?.userId,
      userName: item?.userName,
      name: item?.name,
      description: item?.description,
      taskTracker: item?.taskTracker,
      priority: item?.priority,
      taskType: item?.taskType,
      sprintType: item?.sprintType,
      startDate: item?.startDate,
      estimatedTime: item?.estimatedTime,
      taskStatus: item?.taskStatus,
      fileName: item?.fileName,
      fileUrl: item?.fileUrl,
    };

    setItemUpdate(updateData);
    setTimeout(() => {
      setModalViewShow(true);
    }, 200);
  };

  const closeViewModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-centermb-3">
        {(activeTab === 'TO_DO' && <h6 className="mb-3">To-Do Tasks</h6>) ||
          (activeTab === 'IN_PROGRESS' && (
            <h6 className="mb-3">In-Progress Tasks</h6>
          )) ||
          (activeTab === 'HOLD' && <h6 className="mb-3">Hold Tasks</h6>) ||
          (activeTab === 'COMPLETED' && (
            <h6 className="mb-3">Completed Tasks</h6>
          ))}
        <div className="d-flex justify-content-start align-items-center gap-2">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-circle"
            variant={activeTab === 'TO_DO' ? 'secondary' : 'outline-secondary'}
            tooltip="To-Do"
            className={activeTab === 'TO_DO' ? 'text-light' : 'text-secondary'}
            onClick={() => setActiveTab('TO_DO')}
          />
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-arrow-repeat"
            variant={
              activeTab === 'IN_PROGRESS' ? 'warning' : 'outline-warning'
            }
            tooltip="In-Progress"
            className={
              activeTab === 'IN_PROGRESS' ? 'text-light' : 'text-warning'
            }
            onClick={() => setActiveTab('IN_PROGRESS')}
          />
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-pause-circle"
            variant={activeTab === 'HOLD' ? 'info' : 'outline-info'}
            tooltip="Hold"
            className={activeTab === 'HOLD' ? 'text-light' : 'text-info'}
            onClick={() => setActiveTab('HOLD')}
          />
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-check-circle"
            variant={activeTab === 'COMPLETED' ? 'success' : 'outline-success'}
            tooltip="Completed"
            className={
              activeTab === 'COMPLETED' ? 'text-light' : 'text-success'
            }
            onClick={() => setActiveTab('COMPLETED')}
          />
        </div>
      </div>
      <div>
        <DynamicTable
          data={tableData}
          columns={tableSchema}
          onProgress={
            activeTab === 'TO_DO' || activeTab === 'HOLD'
              ? onProgress
              : undefined
          }
          onHold={activeTab === 'IN_PROGRESS' ? onHold : undefined}
          onCompleted={activeTab === 'IN_PROGRESS' ? onCompleted : undefined}
          onView={onView}
        />
      </div>

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeCompleteModal}
          title="Task Complete"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Complete
            schema={formCompleteSchema}
            itemUpdate={itemUpdate}
            closeModal={closeCompleteModal}
            setActiveTab={setActiveTab}
          />
        </CommonModal>
      )}
      {modalViewShow && (
        <CommonModal
          show={modalViewShow}
          onHide={closeViewModal}
          title="Task Details"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <View
            schema={formViewSchema}
            itemUpdate={itemUpdate}
            closeModal={closeViewModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
