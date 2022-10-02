import Router from '@koa/router'
import { BaseContext } from 'koa'
import pages from '../pages'

const clientRouter = new Router()

Object.entries(pages).forEach(([pageName, content]) => {
    const route = pageName === 'index.html' ? '' : pageName
    clientRouter.get(`/${route}`, (ctx: BaseContext) => {
        ctx.accepts('html')
        ctx.body = content
    })
})

export default clientRouter
