import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListenr } from "./events/TicketCreatedListener";

console.clear();

const stan = nats.connect("ticketing--m", randomBytes(4).toString("hex"), {
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("Event Listener created");

  stan.on("close", () => {
    console.log(" NATS connection closed! ");

    process.exit();
  });

  new TicketCreatedListenr(stan).listen();
});

process.on("SIGTERM", () => stan.close());
process.on("SIGINT", () => stan.close());
