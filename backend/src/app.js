import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

// Express accepting JSON
app.use(express.json({
    limit: '16kb' // Size of data allowed on server
}))

// configuring express for urlencodings
app.use(express.urlencoded({extended: true,limit: '16kb'}))

// configuring static files
app.use(express.static('public'))

// Router imports
import reportRouter from './routes/report.routes.js'

// Report router
app.use("/api/v1/report", reportRouter)

export { app };