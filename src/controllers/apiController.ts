import { Context } from 'koa'
import fs from 'fs'
import Track from '../model/tracks'

export default class ApiController {
    public static async getTracker(ctx: Context): Promise<void> {
        ctx.is('text/javascript')
        ctx.body = fs.createReadStream(`${__dirname}/../scripts/track.js`)
        ctx.status = 200
    }

    public static async createManyEvents(ctx: Context): Promise<void> {
        if (!ctx.request.body) {
            ctx.body = { message: 'No events provided for storing' }
            ctx.status = 404
            return
        }

        try {
            const { events } = JSON.parse(ctx.request.body.toString())

            Track.insertMany(events)
            ctx.body = { message: 'Events stored' }
            ctx.status = 200
        } catch (err) {
            ctx.body = { message: 'Server error' }
            ctx.status = 500
        }
    }
}
