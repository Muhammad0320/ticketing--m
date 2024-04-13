import mongoose from "mongoose";

interface OrderAttrs {
  id: string;
  price: number;
  version: number;
  status: number;
  userId: string;
}

type OrderDoc = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildOrder(attrs: OrderAttrs): OrderDoc;
}
