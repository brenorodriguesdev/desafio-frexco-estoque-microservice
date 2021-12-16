import { AMQPClient } from "../../../data/contracts/amqp-client"

export const makeAMQPClient = (): AMQPClient => {
    class AMQPClientStub implements AMQPClient {
        async send(): Promise<any> {
            return new Promise(resolve => resolve({}))
        }
    }
    return new AMQPClientStub()
}