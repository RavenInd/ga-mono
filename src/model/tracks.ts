import mongoose from 'mongoose'
import uuid from 'node-uuid'
const Schema = mongoose.Schema

const tracksSchema = new Schema({
    _id: {
        type: String,
        default: function genUUID() {
            uuid.v1()
        },
    },
    event: String,
    tags: [String],
    url: String,
    title: String,
    ts: Date,
})

export default mongoose.model('Track', tracksSchema)
