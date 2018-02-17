const express = require('express')
const app = express()
const game = './index.html'

app.get('/', (req, res) => res.sendfile(game))
app.use(express.static('./'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))