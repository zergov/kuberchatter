(async () => {
  const websocket = require('ws')
  const amqp = require('amqplib');

  const message_queue = 'kuberchatter_messages'
  const amqp_connection = await amqp.connect('amqp://localhost')
  const message_channel = await amqp_connection.createChannel()
  await message_channel.assertQueue(message_queue)

  const wss = new websocket.Server({ port: 8080 })

  wss.on('connection', ws => {
    console.log('new user connected.')
  })

  message_channel.consume(message_queue, msg => {
    const message = msg.content.toString()
    console.log(`sending ${message} to all connected users.`)
  }, {noAck: true})
})()
