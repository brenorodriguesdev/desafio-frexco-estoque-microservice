import { AMQPRequest } from "./amqp";

export interface Controller {
    handle(AMQPRequest: AMQPRequest): Promise<any>
}