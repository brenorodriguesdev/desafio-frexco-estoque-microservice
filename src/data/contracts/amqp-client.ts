export interface AMQPClient {
    send: (queue: string, payload: any) => Promise<any>
}