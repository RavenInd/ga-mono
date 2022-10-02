import mongoose from 'mongoose'

import { connectionString } from '../config'

const initDB = () => {
    mongoose.connect(connectionString)

    mongoose.connection.once('open', () => {
        console.log('connected to database')
    })

    mongoose.connection.on('error', console.error)
}

export default initDB
