import nats from "node-nats-streaming";

const stan = nats.connect("ticketing--m", "223", {
  connectTimeout: 100 * 1000,
});
