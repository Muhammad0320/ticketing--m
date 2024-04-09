import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  ticket: string;
  expiresAt: Date;
}

type OrderDoc = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildOrder(attrs: OrderAttrs): OrderDoc;
}
