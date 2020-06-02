const app = require('./app')

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port '+ port)
    console.log(process.env.MONGODB_URL)
    console.log(process.env.JWT_SECRET)
})