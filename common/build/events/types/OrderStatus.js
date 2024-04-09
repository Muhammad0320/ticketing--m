"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Completed"] = "completed";
    OrderStatus["AwaitingPaymemt"] = "Awaiting:payment";
    OrderStatus["Created"] = "created";
    OrderStatus["Cancelled"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
