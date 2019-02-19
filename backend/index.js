(async () => {
  const express = require('express')
  const bodyParser = require('body-parser')
  const amqp = require('amqplib')

  // setup message queue
  const message_queue = 'kuberchatter_messages'
  const message_queue_host = process.env.RABBITMQ_SERVICE_HOST || 'rabbitmq'
  const amqp_connection = await amqp.connect(`amqp://${message_queue_host}`)
  const message_channel = await amqp_connection.createChannel()
  await message_channel.assertQueue(message_queue)

  const app = express()

  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
  })

  // routes
  app.get('/', (req, res) => res.json({
    message: 'Hello world!',
    envs: process.env,
  }))
  app.post('/send', async (req, res) => {
    const {message} = req.body
    message_channel.sendToQueue(message_queue, Buffer.from(message))
    return res.status(200).end()
  })

  const port = 5000
  app.listen(port, () => console.log(`Kuberchatter started on port ${port}`))
})()
