export interface OrderCancelledEvent {
  subject: OrderCancelledEvent;

  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
