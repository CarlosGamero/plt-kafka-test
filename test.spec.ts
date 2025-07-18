import {
    Consumer,
    stringDeserializers,
} from '@platformatic/kafka'
import { setTimeout } from 'node:timers/promises'
import {describe, it} from "vitest";

const bootstrapBrokers = ['localhost:9092']

describe('platformatic-kafka consumer problem', () => {
    it('test', { timeout: 150000 }, async () => {
        const clientId = 'my_client'
        const topic = 'test-topic'
        const groupId = 'test-group'

        const consumer = new Consumer({
            clientId,
            groupId,
            bootstrapBrokers,
            deserializers: stringDeserializers,
            autocreateTopics: true,
        })

        const stream = await consumer.consume({ topics: [topic],  })
        stream.on('data', (message) => {
            console.log(message)
        })

        console.log('Consumer active')
        await setTimeout(100000)
        console.log('Timeout reached, closing consumer')

        // Cleanup
        await new Promise((done) => stream.close(done))
        await consumer.close()
    })
})
