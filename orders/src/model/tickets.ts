import mongoose from "mongoose";
import Orders, { OrderStatus } from "./orders";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export type TicketDoc = TicketAttrs &
  mongoose.Document & {
    isReserved(): Promise<boolean>;
  };

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildTicket(attrs: TicketAttrs): Promise<TicketDoc>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This field is required"],
    },

    price: {
      type: Number,
      required: [true, "This field is required"],
      min: 0,
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

ticketSchema.statics.buildTicket = async (attrs: TicketAttrs) => {
  return await Ticket.create({ ...attrs, _id: attrs.id });
};

ticketSchema.methods.isReserved = async function () {
  const ticket = await Orders.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.AwaitingPaymemt,
        OrderStatus.Completed,
        OrderStatus.Created,
      ],
    },
  });

  return !!ticket;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export default Ticket;
