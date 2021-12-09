import { Controller } from "../../presentation/contracts/controller"

export const adaptQueue = (channel: any, controller: Controller) => {
    return async (msg: any) => {
        try {

            const result = await controller.handle({ payload: JSON.parse(msg.content) })

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(result ? JSON.stringify(result) : ''), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        } catch (error) {

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(JSON.stringify({
                    error: error.message
                })), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        }
    }
}