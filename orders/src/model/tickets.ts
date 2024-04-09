import mongoose from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
}

export type TicketDoc = TicketAttrs &
  mongoose.Document & {
    isReserved(): Promise<boolean>;
  };

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildOrder(attrs: TicketAttrs): TicketDoc;
}
