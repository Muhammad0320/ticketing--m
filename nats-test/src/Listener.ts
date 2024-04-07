import nats from "node-nats-streaming";

const stan = nats.connect("ticketing--m", "223", {
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("Event Listener created");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", () => {
    console.log("Message received");
  });
});
