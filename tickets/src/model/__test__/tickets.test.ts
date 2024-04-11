import mongoose from "mongoose";
import Tickets from "../tickets";

it("implements optimistic concurrency control", async () => {
  // Create a new ticket
  const ticket = await Tickets.buildTicket({
    title: "shit",
    price: 90,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  // Fetch the created ticket w/ 2 intances
  const ticketInstance1 = await Tickets.findById(ticket.id);
  const ticketInstance2 = await Tickets.findById(ticket.id);

  // Update both instances

  ticketInstance1?.set({ price: 60 });
  ticketInstance2?.set({ price: 70 });

  // save the first instace

  await ticketInstance1?.save();

  // then the second

  //   expect(async () => {
  //     await ticketInstance2?.save();
  // }).toThrow();

  try {
    await ticketInstance2?.save();
  } catch (error) {
    return;
  }

  throw new Error("Should not reach this point");
});
