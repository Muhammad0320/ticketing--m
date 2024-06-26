import { OrderCreatedListener } from "./event/listener/OrderCreatedListener";
import { natsWrapper } from "./natsWrapper";

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log(" NATS connection closed! ");
      process.exit();
    });

    process.on("SIGTERM", () => natsWrapper.client.close());
    process.on("SIGINT", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();

    console.log("Started expiration");
  } catch (err) {
    console.log("Let's see");
    console.error(err);
  }

  // app.listen(3000, () => {
  //   console.log("Listening on port 3000!!!!!!!!");
  // });
};

start();
