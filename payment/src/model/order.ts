import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
  id: string;
  price: number;
  version: number;
  status: OrderStatus.Created;
  userId: string;
}

type OrderDoc = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDoc> {
  buildOrder(attrs: OrderAttrs): Promise<OrderDoc>;
}

const orderSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "This field is required"],
    },

    version: {
      type: Number,
      required: [true, "This field is required"],
    },

    status: {
      type: String,
      required: [true, "This field is required"],
    },

    userId: {
      type: String,
      required: [true, "This field is required"],
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
  return await Orders.create({
    _id: attrs.id,
    ...attrs,
  });
};

const Orders = mongoose.model<OrderDoc, OrderModel>(" Orders ", orderSchema);

export { Orders };
