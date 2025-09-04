export interface Event {
  id?: string;
  attendanceId: String;
  type:
    | 'DAY_START'
    | 'BREAK_START'
    | 'BREAK_END'
    | 'OUTING_START'
    | 'OUTING_END'
    | 'DAY_END';
  timestamp: string;
  lat: string;
  lng: string;
  remarks: string;
}


export interface AttendanceDto {
  id: string;
  userId: string;
  workDate: string;
  staySeconds: string;
  status: 'OPEN' | 'CLOSED';
  events: Event[] | null;
}

export interface AttendanceParam {
  userId: string;
  workDate: string;
  status: 'OPEN' | 'CLOSED';
  events: Event[] | null;
}