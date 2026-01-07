export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface StoryEvent {
  year: string;
  title: string;
  description: string;
  image: string;
  align: 'left' | 'right';
}

export enum AttendanceStatus {
  YES = 'YES',
  NO = 'NO',
  MAYBE = 'MAYBE'
}