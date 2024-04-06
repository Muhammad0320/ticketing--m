import nats, { Stan } from "node-nats-streaming";

const stan = nats.connect("ticketing--m", "shitt", {
  url: "http://localhost:4222",
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("publisher connected to NATS!");
});
