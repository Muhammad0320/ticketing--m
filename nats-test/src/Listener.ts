import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing--m", randomBytes(4).toString("hex"), {
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("Event Listener created");

  const subscription = stan.subscribe(
    "ticket:created",
    "order-service-queue-group"
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData() as string;

    console.log(
      "Event # " + msg.getSequence() + " was received, of data:  " + data
    );
  });
});
