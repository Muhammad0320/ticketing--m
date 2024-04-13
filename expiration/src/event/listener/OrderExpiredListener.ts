import { Listener } from "@m0ticketing/common";

interface OrderExpiredListneer {
  orderId: string;
}

export class OrderExpiredListener extends Listener<OrderExpiredListneer> {}
