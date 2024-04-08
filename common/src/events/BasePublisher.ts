import { Stan } from "node-nats-streaming";
import { Subjects } from "./Subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subjects: T["subject"];

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subjects, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }
}
