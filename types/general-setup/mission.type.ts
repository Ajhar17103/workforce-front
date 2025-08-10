// types/mission.ts

export interface MissionDto {
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
  missionDescription: string;
  raisingDate: string;
  missionCountryDto: any | null;
  startDate: string;
  endDate: string;
}

export interface MissionTable {
  id: number;
  name: string;
  missionDescription: string;
  raisingDate: string;
  missionCountryId:string,
  startDate: string;
  endDate: string;
}


export interface MissionParam {
  name: string;
  missionDescription: string;
  raisingDate: string;
  missionCountryId: string;
  startDate: string;
  endDate: string;
}

export interface MissionUpdateProps {
  itemUpdate?: MissionTable;
  closeModal: () => void;
};