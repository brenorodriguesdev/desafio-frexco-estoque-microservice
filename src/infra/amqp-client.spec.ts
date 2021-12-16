var amqp = require('amqplib/callback_api');
import { AMQPClientAdapter } from './amqp-client';

const makeSut = (): AMQPClientAdapter => {
    return new AMQPClientAdapter()
}

describe('AMQPClientAdapter', () => {

    beforeAll(async () => {
        amqp.connect('amqp://localhost', function (error0, connection) {
            connection.createChannel(function (error1, channel) {
                channel.consume('teste', async (msg: any) => {
                    channel.sendToQueue(msg.properties.replyTo,
                        Buffer.from(JSON.stringify({ message: 'hello world' })), {
                        correlationId: msg.properties.correlationId
                    });
                });
            });
        });
    })

    test('Garantir que a mensagem seja enviada', async () => {
        const sut = makeSut()
        const response = await sut.send('teste', {})
        expect(response).toEqual({ message: 'hello world' })
    })
})