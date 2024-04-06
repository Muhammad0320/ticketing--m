import nats, { Stan } from "node-nats-streaming";

const stan = nats.connect("ticketing", "shitt", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to NATS!");
});
