export interface DailyScrumDto {
  id: string;
  userId: string;
  userName?: string;
  date: string;
  description: string;
  challenge?: string;
}

export interface DailyScrumParam {
  id: string;
  userId: string;
  date: string;
  description?: string;
  challenge?: string;
}

export interface DailyScrumUpdateProps {
  schema?: any;
  itemUpdate?: DailyScrumParam;
  closeModal: () => void;
}
