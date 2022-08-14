import express from 'express';
import 'dotenv/config';
import { productRouter, cartRouter } from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',productRouter)
app.use('/api',cartRouter)

const server = app.listen(PORT, () => {
    console.log(` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥`);
});

server.on('error', (err) => {
    console.log(err);
});
