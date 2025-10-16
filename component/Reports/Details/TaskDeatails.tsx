'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTaskByUserId } from '@/redux/slices/taskSlice';
import { TaskDto } from '@/types/task-board/task.type';
import { useEffect, useState } from 'react';
import { tableSchema } from './MyTaskSchema';

export default function TaskDetails({ userId }: any) {
  const dispatch = useAppDispatch();
  const { userTasks } = useAppSelector((state) => state.task);
  const [todoData, setTodoData] = useState<TaskDto[]>([]);
  const [onprogressData, setOnprogressData] = useState<TaskDto[]>([]);
  const [holdData, setHoldData] = useState<TaskDto[]>([]);
  const [completedData, setCompletedData] = useState<TaskDto[]>([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTaskByUserId(userId));
    }
  }, [dispatch, userId]);

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

    setTodoData(transformed.filter((task) => task.taskStatus === 'TO_DO'));
    setOnprogressData(
      transformed.filter((task) => task.taskStatus === 'IN_PROGRESS'),
    );
    setHoldData(transformed.filter((task) => task.taskStatus === 'HOLD'));
    setCompletedData(
      transformed.filter((task) => task.taskStatus === 'COMPLETED'),
    );
  }, [userTasks]);

  const sections = [
    { id: 16, title: "Todo's", data: todoData },
    { id: 22, title: 'On Progress', data: onprogressData },
    { id: 36, title: 'On Hold', data: holdData },
    { id: 49, title: 'Completed', data: completedData },
  ];

  const hasData = sections.some((section) => section.data?.length > 0);

  return (
    <div>
      {hasData ? (
        sections.map(
          (section) =>
            section.data?.length > 0 && (
              <div key={section.id} className="card shadow-sm p-2 dark mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-semibold text-blue">
                    {section.title}
                  </h6>
                </div>
                <DynamicTable
                  data={section.data}
                  columns={tableSchema}
                  action={false}
                  pagination={true}
                />
              </div>
            ),
        )
      ) : (
        <div className="text-center py-4 text-gray-500">
          No tasks found for this user.
        </div>
      )}
    </div>
  );
}
