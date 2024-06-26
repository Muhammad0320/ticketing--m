import { Subjects } from "./Subjects";
import { Message, Stan, SubscriptionOptions } from "node-nats-streaming";
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    abstract onMessage(data: T["data"], msg: Message): void;
    protected client: Stan;
    protected ackWait: number;
    constructor(client: Stan);
    subscriptionOptions(): SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
export {};
