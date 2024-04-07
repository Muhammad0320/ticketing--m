import nats, { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing--m", "223", {
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("Event Listener created");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    const data = msg.getData() as string;

    console.log(
      "Event # " + msg.getSequence() + " was received, of data:  " + data
    );
  });
});
