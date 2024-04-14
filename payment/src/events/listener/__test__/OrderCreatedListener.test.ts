import mongoose from "mongoose"
import { Orders } from "../../../model/order"
import { Message } from 'node-nats-streaming';
import { natsWrapper } from "../../../natsWrapper"
import { OrderCreatedListener } from "../OrderCreatedListener"
import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common"


const setup =async () => {

    const listener = new OrderCreatedListener(natsWrapper.client) 

    const order = await Orders.buildOrder({  id: new mongoose.Types.ObjectId().toHexString(),
                price: 55,
        version: 0,
        status: OrderStatus.Created,
        userId:  'shit user'  })


        const data : OrderCreatedEvent['data'] = {


            id: order.id,
            status: order.status,
            userId: order.userId,
            expiresAt: 'shit date',
            ticket: {
                id: new mongoose.Types.ObjectId().toHexString() ,
                price: order.price,
            }

        }

            // @ts-ignore
            const msg: Message {

                ack: jest.fn()

            }


            return { msg, data, order, listener  }
}



it(' create and saves a tikcket ', async () => {


    const  { msg, data, order, listener  } = await setup() ;

   await listener.onMessage(data, msg) 



    const newlyCreatedOrder = await Orders.findById(data.id) 

    expect(newlyCreatedOrder.id).toEqual(order.id) 



})


it('acks the message',  async () => {


    const  { msg, data, order, listener  } = await setup() ;

    await listener.onMessage(data, msg) 

    expect(msg.ack).toHaveBeenCalled()

})