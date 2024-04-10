import Ticket from "../../model/tickets";

const buildTicket = async () => {
  const ticket = await Ticket.buildTicket({ price: 99, title: "sport event" });

  return ticket;
};

it("fetckes all the tickets that belogs to a user", async () => {});
