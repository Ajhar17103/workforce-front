// types/allowance.ts

export interface AllowanceDto {
  id: string;
  version: number | null;
  deleted: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  ipAddress: string | null;
  name: string;
  payStatus: 'PAY' | 'NOPAY';
  applyFor: 'OFFICER' | 'SAILOR' | 'UNKNOWN';
  calculationMode: 'FIXED' | 'VARIABLE';
  actionStatus: 'ADDITION' | 'DEDUCTION';
  duration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  jsiDuration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  payBasedOn: 'BASIC' | 'GROSS' | 'OTHER';
  processType: 'COMPULSORY' | 'OPTIONAL';
  noProcessCurrentMonth: boolean;
  treatReceivable: boolean;
  notAllowedPension: boolean;
  payAllowanceDetail: string;
  budgetCode: string | null;
}

export interface AllowanceTable {
  id: number;
  name: string;
  payStatus: 'PAY' | 'NOPAY';
  applyFor: 'OFFICER' | 'SAILOR' | 'UNKNOWN';
  calculationMode: 'FIXED' | 'VARIABLE';
  actionStatus: 'ADDITION' | 'DEDUCTION';
  duration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  jsiDuration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  payBasedOn: 'BASIC' | 'GROSS' | 'OTHER';
  processType: 'COMPULSORY' | 'OPTIONAL';
  noProcessCurrentMonth: boolean;
  treatReceivable: boolean;
  notAllowedPension: boolean;
  payAllowanceDetail: string;
  budgetCode: string | null;
}


export interface AllowanceParam {
  name: string;
  payStatus: 'PAY' | 'NOPAY';
  applyFor: 'OFFICER' | 'SAILOR' | 'UNKNOWN';
  calculationMode: 'FIXED' | 'VARIABLE';
  actionStatus: 'ADDITION' | 'DEDUCTION';
  duration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  jsiDuration: 'DAILY' | 'MONTHLY' | 'YEARLY';
  payBasedOn: 'BASIC' | 'GROSS' | 'OTHER';
  processType: 'COMPULSORY' | 'OPTIONAL';
  noProcessCurrentMonth: boolean;
  treatReceivable: boolean;
  notAllowedPension: boolean;
  payAllowanceDetail: string;
  budgetCode: string | null;
}


export interface AllowanceUpdateProps {
  itemUpdate: AllowanceTable;
  closeModal: () => void;
};