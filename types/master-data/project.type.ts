export interface ProjectDto {
  id: string;
  name?: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  assignToUser?: string[];
}

export interface ProjectParam {
  id: string;
  name?: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  assignToUser?: string[];
}

export interface ProjectUpdateProps {
  schema?: any;
  itemUpdate?: ProjectParam;
  closeModal: () => void;
}
