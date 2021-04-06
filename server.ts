import next from 'next'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV || `development`
const app = next( { dev: dev !== `production` } )
const host = process.env.HOST || `http://localhost`

const handle = app.getRequestHandler()

app.prepare().then( () => {
	const server = express()

	server.use( cors( {
		origin: true,
		credentials: true
	} ) )

	server.all( `*`, ( req, res ) => {
		return handle( req, res )
	} )

	server.listen( port, () => {
		console.log( `> Ready on ${host}:${port}` )
	} )
} )