"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
class Publisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
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
exports.Publisher = Publisher;