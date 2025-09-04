import { AttendanceDto } from "@/types/attendance/attendance.type";

export const getTotalTimeSinceEvent = (
  attendance: AttendanceDto | undefined,
  type: Event['type'],
): number | null => {
  if (!attendance?.events) return null;

  const event = attendance.events.find((e) => e.type === type);
  if (!event) return null;

  const eventTime = new Date(event.timestamp);
  const now = new Date();

  const diffMs = now.getTime() - eventTime.getTime();
  if (diffMs < 0) return 0;

  return Math.floor(diffMs / 1000);
};
