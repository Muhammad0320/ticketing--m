import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

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

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-serivce");

  const subscription = stan.subscribe(
    "ticket:created",
    "order-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData() as string;

    console.log(
      "Event # " + msg.getSequence() + " was received, of data:  " + data
    );

    msg.ack();
  });
});

process.on("SIGTERM", () => stan.close());
process.on("SIGINT", () => stan.close());
