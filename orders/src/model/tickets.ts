import mongoose from "mongoose";
import Orders, { OrderStatus } from "./orders";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export type TicketDoc = TicketAttrs & {
  version: number;
} & mongoose.Document & {
    isReserved(): Promise<boolean>;
  };

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildTicket(attrs: TicketAttrs): Promise<TicketDoc>;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
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

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.buildTicket = async (attrs: TicketAttrs) => {
  return await Ticket.create({ ...attrs, _id: attrs.id });
};

ticketSchema.statics.findByEvent = async (event: {
  id: string;
  version: number;
}) => {
  return await Ticket.findOne({ _id: event.id, version: event.version - 1 });
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
