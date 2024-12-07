require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./db/connection')

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running successfully @ ${PORT}`);
})
