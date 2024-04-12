import mongoose from "mongoose";

import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type TicketAttrs = {
  userId: string;
  title: string;
  price: number;
};

type TicketDoc = mongoose.Document &
  TicketAttrs & { version: number; orderId?: string };

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildTicket(attrs: TicketAttrs): Promise<TicketDoc>;
}

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,

      require: [true, "This field is required"],
    },

    title: {
      type: String,
      require: [true, "This field is required"],
    },

    price: {
      type: Number,

      require: [true, "This field is required"],
    },

    orderId: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;

        delete ret._id;
      },
    },
  }
);

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.buildTicket = async (attrs: TicketAttrs) => {
  return await Tickets.create(attrs);
};

const Tickets = mongoose.model<TicketDoc, TicketModel>("Tickets", ticketSchema);

export default Tickets;
