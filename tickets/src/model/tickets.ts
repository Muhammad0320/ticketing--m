import mongoose from "mongoose";

type TicketAttrs = {
  userId: string;
  title: string;
  price: number;
};

type TicketDoc = mongoose.Document & TicketAttrs;

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildTicket(attrs: TicketAttrs): TicketDoc;
}
