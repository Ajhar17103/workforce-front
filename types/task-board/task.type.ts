export interface TaskDto {
  id: string;
  projectId: string;
  projectName?: string;
  sprintId: string;
  sprintName?: string;
  userId: string;
  userName?: string;
  name: string;
  description?: string;
  taskTracker: string;
  priority: string;
  taskType: string;
  sprintType: string;
  startDate?: string | null;
  estimatedTime: string;
  taskStatus: string;
  fileName?: string;
  fileUrl?: string;
}

export interface TaskParam {
  id: string;
  projectId: string;
  sprintId: string;
  currentSprintName?: string;
  userId: string;
  name: string;
  description?: string;
  taskTracker: string;
  priority: string;
  taskType: string;
  startDate?: string | null;
  estimatedTime: string;
  taskStatus: string;
  file?: string;
  challenges?: string;
  remarks?: string;
}

export interface TaskUpdateProps {
  schema?: any;
  itemUpdate?: TaskParam;
  closeModal: () => void;
  setActiveTab?: any;
}
