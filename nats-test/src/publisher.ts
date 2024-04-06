import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "shitt", {
  url: "http://localhost:4222",
});
