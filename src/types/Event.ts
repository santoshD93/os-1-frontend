import { EventType } from "./EventType"

export interface Event {
  id: number;
  createdAt: string;
  updatedAt?: string;
  date: string;
  name: string;
  description?: string;
  userId: number;
  eventTypeId: number;
  eventType: EventType;
}