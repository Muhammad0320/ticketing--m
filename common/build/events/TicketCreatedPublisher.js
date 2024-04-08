"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCreatedPublisher = void 0;
const BasePublisher_1 = require("./BasePublisher");
const Subjects_1 = require("./Subjects");
class TicketCreatedPublisher extends BasePublisher_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = Subjects_1.Subjects.TicketCreated;
    }
}
exports.TicketCreatedPublisher = TicketCreatedPublisher;
