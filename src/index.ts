import express from 'express'
import http from 'http'
import moviesRouter from './routes/movies'
import db from './db'

const PORT = 8080

async function setup() {
  await db.init()

  const app = express()
  const server = http.createServer(app)

  app.use(express.json())
  app.use('/ping', (_req, res) => res.send('pong'))
  app.use('/movies', moviesRouter)

  server.listen(PORT, () => console.log(`Server running on port :${PORT}`))
}

setup()