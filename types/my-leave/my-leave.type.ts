export interface LeaveDto {
  id: string;
  userId: string;
  userName?: string;
  fiscalYear: string;
  totalSickLeave: string;
  takenSickLeave: string;
  totalCasualLeave: string;
  takenCasualLeave: string;
  totalAnnualLeave: string;
  takenAnnualLeave: string;
}

export interface LeaveParam {
  id: string;
  userId: string;
  userName?: string;
  fiscalYear: string;
  totalSickLeave: string;
  takenSickLeave: string;
  totalCasualLeave: string;
  takenCasualLeave: string;
  totalAnnualLeave: string;
  takenAnnualLeave: string;
}

export interface LeaveUpdateProps {
  schema?: any;
  itemUpdate?: LeaveParam;
  closeModal: () => void;
  setActiveTab?: any;
}
