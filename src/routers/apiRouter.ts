import Router from '@koa/router'
import { apiController } from '../controllers'
import pages from '../pages'

const apiRouter = new Router()

apiRouter.get('/', apiController.getTracker)
apiRouter.post('/track', apiController.createManyEvents)

export default apiRouter
