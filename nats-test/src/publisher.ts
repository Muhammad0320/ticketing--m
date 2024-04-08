import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/TicketCreatedPublisher";

console.clear();

const stan = nats.connect("ticketing--m", "shitt", {
  url: "http://localhost:4222",
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("publisher connected to NATS!");

  new TicketCreatedPublisher(stan).publish({
    id: "abc",
    title: "concert",
    price: 45,
  });
});
