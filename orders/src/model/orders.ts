import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";
import { TicketDoc } from "./tickets";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  ticket: TicketDoc;
  expiresAt: Date;
}

export type OrderDoc = mongoose.Document & OrderAttrs & { version: number };

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildOrder(attrs: OrderAttrs): Promise<OrderDoc>;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "An order must belong to a user"],
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },

    expiresAt: Date,

    ticket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.buildOrder = async (attrs: OrderAttrs) => {
  return await Orders.create(attrs);
};

const Orders = mongoose.model<OrderDoc, OrderModel>("Orders", orderSchema);

export default Orders;
