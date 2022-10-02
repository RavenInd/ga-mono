import Koa from 'koa'
import cors from '@koa/cors'
import { API_PORT, CLIENT_PORT } from './config'
import { clientRouter, apiRouter } from './routers'
import initDB from './db'
import bodyParser from 'koa-bodyparser'

initDB()

const webServer = new Koa()
const apiServer = new Koa()

webServer.use(cors())
webServer.use(clientRouter.routes()).use(clientRouter.allowedMethods())

apiServer.use(cors())
apiServer.use(bodyParser({ enableTypes: ['text'] }))
apiServer.use(apiRouter.routes()).use(apiRouter.allowedMethods())

webServer.listen(CLIENT_PORT, () => {
    console.log(`Web server running on port ${CLIENT_PORT}`)
})

apiServer.listen(API_PORT, () => {
    console.log(`API server running on port ${API_PORT}`)
})
