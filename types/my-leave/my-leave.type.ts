export interface AllocatedLeaveDto {
  id: string;
  userId?: string;
  userName?: string;
  fiscalYear: string;
  totalSickLeave: string;
  takenSickLeave: string;
  totalCasualLeave: string;
  takenCasualLeave: string;
  totalAnnualLeave: string;
  takenAnnualLeave: string;
  paidLeave?: string;

  sickLeave?: string;
  casualLeave?: string;
  annualLeave?: string;
}

export interface AllocatedLeaveParam {
  id: string;
  userId?: string;
  userName?: string;
  fiscalYear: string;
  totalSickLeave: string;
  takenSickLeave: string;
  totalCasualLeave: string;
  takenCasualLeave: string;
  totalAnnualLeave: string;
  takenAnnualLeave: string;
  paidLeave?: string;
}

export interface AllocatedLeaveUpdateProps {
  schema?: any;
  itemUpdate?: AllocatedLeaveDto;
  closeModal: () => void;
  setActiveTab?: any;
}

export interface LeaveDto {
  id: string;
  userId: string;
  userName?: string;
  fiscalYear: string;
  leaveType: string;
  leaveFor: string;
  fromDate: string;
  toDate: string;
  days?: string;
}

export interface LeaveParam {
  id: string;
  userId: string;
  userName?: string;
  fiscalYear: string;
  leaveType: string;
  leaveFor: string;
  fromDate: string;
  toDate: string;
  days?: string;
}

export interface LeaveUpdateProps {
  schema?: any;
  itemUpdate?: LeaveParam;
  closeModal: () => void;
  setActiveTab?: any;
}
