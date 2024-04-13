import Queue from "bull";
import { natsWrapper } from "../natsWrapper";
import { ExpirationCompletePublisher } from "../event/publisher/ExpirationCompletedPublisher";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: { host: process.env.REDIS_HOST },
});

expirationQueue.process(async (job) => {
  await new ExpirationCompletePublisher(natsWrapper.client).publish({
    id: job.data.orderId,
  });

  console.log("Published expiration completed listener");
});

export { expirationQueue };

// npm update @m0ticketing/common
