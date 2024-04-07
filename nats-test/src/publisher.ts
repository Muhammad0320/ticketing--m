import nats from "node-nats-streaming";

const stan = nats.connect("ticketing--m", "shitt", {
  url: "http://localhost:4222",
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("publisher connected to NATS!");

  const data = JSON.stringify({ id: "abc", title: "concert", price: 45 });

  stan.publish("ticket:created", data, () => {
    console.log("Event pubished!");
  });
});
