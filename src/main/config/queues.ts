import { readdirSync } from 'fs'

export default (channel: any): void => {
  readdirSync(`${__dirname}/../queues`).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../queues/${file}`)).default(channel)
    }
  })