import express from 'express'
import { apiRouter } from './routes/api.js';


const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// import package
app.use(express.json())

// routes registration
app.use('/api', apiRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});