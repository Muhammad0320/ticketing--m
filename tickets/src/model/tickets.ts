import mongoose from "mongoose";

type TicketAttrs = {
  userId: string;
  title: string;
  price: number;
};

type TicketDoc = mongoose.Document & TicketAttrs & { version: number };

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

ticketSchema.statics.buildTicket = async (attrs: TicketAttrs) => {
  return await Tickets.create(attrs);
};

const Tickets = mongoose.model<TicketDoc, TicketModel>("Tickets", ticketSchema);

export default Tickets;
