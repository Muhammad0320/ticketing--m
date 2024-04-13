import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@m0ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationCompleted;
}
