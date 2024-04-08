"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setAckWait(this.ackWait)
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
            console.log(` Received event ${msg.getSequence()} ${this.subject} / ${this.queueGroupName} `);
            const data = this.parseMessage(msg);
            this.onMessage(data, msg);
        }));
    }
    parseMessage(msg) {
        const data = msg.getData();
        return JSON.parse(data);
    }
}
exports.Listener = Listener;
