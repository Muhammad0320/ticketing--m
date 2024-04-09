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
