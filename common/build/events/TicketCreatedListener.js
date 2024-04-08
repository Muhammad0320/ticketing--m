"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCreatedListenr = void 0;
const BaseListener_1 = require("./BaseListener");
const Subjects_1 = require("./Subjects");
class TicketCreatedListenr extends BaseListener_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = Subjects_1.Subjects.TicketCreated;
        this.queueGroupName = "payment-service";
    }
    onMessage(data, msg) {
        console.log(`Event data!`, data);
        msg.ack();
    }
}
exports.TicketCreatedListenr = TicketCreatedListenr;
