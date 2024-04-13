import { Subjects } from "./Subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationCompleted;

  data: {
    id: string;
  };
}
