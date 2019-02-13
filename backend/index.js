const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.json({message: 'Hello world!'}))

app.listen(port, () => console.log(`Kuberchatter started on port ${port}`))
