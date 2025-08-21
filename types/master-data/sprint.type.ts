export interface SprintDto {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  startDate: string;
  endDate?: string | null;
  workingDays: Number;
  dailyWorkingHrs: Number;
  totalSprintHrs: Number;
  sprintType: string;
}

export interface SprintParam {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate?: string | null;
  workingDays: Number;
  dailyWorkingHrs: Number;
  totalSprintHrs: Number;
  sprintType: string;
}

export interface SprintUpdateProps {
  schema?: any;
  itemUpdate?: SprintParam;
  closeModal: () => void;
}
