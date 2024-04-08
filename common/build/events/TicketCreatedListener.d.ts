import { Message } from "node-nats-streaming";
import { Listener } from "./BaseListener";
import { TicketCreatedEvent } from "./TicketCreatedEvent";
import { Subjects } from "./Subjects";
export declare class TicketCreatedListenr extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string;
    onMessage(data: TicketCreatedEvent["data"], msg: Message): void;
}
