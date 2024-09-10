const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());
const port = 3001
app.use(express.json());


const { pool } = require('./API/database');
const authAPIRouter=require('./API/authAPI');

app.use('/auth',authAPIRouter);

app.listen(port, () => {
console.log(`App listening on port ${port}`)
})