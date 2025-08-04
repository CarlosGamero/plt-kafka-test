import {
  Consumer,
  Producer,
  stringDeserializers,
  stringSerializers,
} from '@platformatic/kafka'
import { setTimeout } from 'node:timers/promises'
import {describe, it} from "vitest";
import {randomUUID} from 'node:crypto';

const bootstrapBrokers = ['localhost:9092']

describe('Test consumer', () => {
  it('test', { timeout: 150000 }, async () => {
    const topic = 'test-topic'
    const groupId = 'test-group'

    const consumer = new Consumer({
      clientId: randomUUID(),
      groupId,
      bootstrapBrokers,
      deserializers: stringDeserializers,
      autocreateTopics: true,
    })

    const stream = await consumer.consume({ topics: [topic],  })
    stream.on('data', async (message) => {
      console.log('Received message', message)
      await message.commit()
    })

    const producer = new Producer({
      clientId: randomUUID(),
      bootstrapBrokers,
      serializers: stringSerializers,
      autocreateTopics: true,
    })

    await producer.send({
      messages: [
        {
          topic,
          key: 'test-key',
          value: 'Test message 1',
        },
      ]
    })

    await setTimeout(5000)
    console.log('Timeout reached, closing consumer')

    // Cleanup
    await stream.close()
    await consumer.close()
    await producer.close()
  })
})
