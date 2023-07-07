import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes.js'

const app = express()

const port = process.env.PORT || 3001

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
)

app.use(express.json())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
	res.json('It works! yehet')
})

app.use(express.static('public'))
app.listen(port, () => {
	console.log(`Connected, running on port ${port}`)
})

const url = process.env.MONGODB_URL
;(async () => {
	try {
		await mongoose.connect(url)
		console.log('Connected to MongoDB')
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error)
	}
})()
