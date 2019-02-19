(async () => {
  const websocket = require('ws')
  const amqp = require('amqplib');

  const message_queue = 'kuberchatter_messages'
  const message_queue_host = process.env.RABBITMQ_SERVICE_HOST || 'rabbitmq'
  const amqp_connection = await amqp.connect(`amqp://${message_queue_host}`)
  const message_channel = await amqp_connection.createChannel()
  await message_channel.assertQueue(message_queue)

  const port = 8080
  const wss = new websocket.Server({ port })
  console.log(`chat-service started on port: ${port}`)

  wss.on('connection', ws => {
    console.log('new user connected.')
  })

  function broadcast_message(message) {
    wss.clients.forEach(client => {
      if (client.readyState === websocket.OPEN) client.send(message)
    });
  }

  message_channel.consume(message_queue, msg => {
    const message = msg.content.toString()
    broadcast_message(message)
  }, {noAck: true})
})()
