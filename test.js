const app = require('http')
.createServer((req, res) => res.send('Oh, Hi There!!'))

const PORT = process.env.PORT
app.listen(3002, () => {
    console.log(`app is listening on port ${PORT}`)
})

console.log(PORT)