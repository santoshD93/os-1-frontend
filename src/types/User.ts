import { EventType } from './EventType';

export interface User {
  id: number;
  createdAt: string;
  updatedAt?: string;
  name: string;
  surname: string;
  email: string;
  eventTypes: EventType[];
}
