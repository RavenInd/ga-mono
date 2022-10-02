const config = {
    headers: {
        'Content-Type': 'text/plain',
    },
    apiUrl: 'http://localhost:8001',
    debounceTimeMs: 1000,
}

let buffer = []
let lastTimeTrackDataSent = null
let timeout = null

const getTimeDelta = (date1, date2) => {
    if (!date2) return config.debounceTimeMs
    return date1.getTime() - date2.getTime()
}

const buildTrackData = (event, tags) => {
    return {
        event,
        tags,
        url: window.location.href,
        title: document.getElementsByTagName('title')[0].innerHTML,
        ts: new Date().toISOString(),
    }
}

const addTrackDataToBuffer = (trackData) => {
    buffer.push(trackData)
}

const clearBuffer = () => {
    buffer = []
}

const sendTrackDataArrayToServer = () => {
    if (!buffer.length) return

    const currentBuffer = [...buffer]
    clearBuffer()
    lastTimeTrackDataSent = new Date()

    fetch(`${config.apiUrl}/track`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({ events: currentBuffer }),
    }).catch(() => {
        const newCurrentBuffer = [...buffer]
        buffer = [...currentBuffer, ...newCurrentBuffer]
    })
}

class Tracker {
    track(event, ...tags) {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }

        const trackData = buildTrackData(event, tags)
        addTrackDataToBuffer(trackData)

        const lastSendMs = getTimeDelta(new Date(), lastTimeTrackDataSent)

        if (buffer.length >= 3) {
            sendTrackDataArrayToServer()
            return
        }

        if (lastTimeTrackDataSent && lastSendMs >= config.debounceTimeMs) {
            sendTrackDataArrayToServer()
        } else {
            timeout = setTimeout(() => {
                sendTrackDataArrayToServer()
            }, config.debounceTimeMs - lastSendMs)
        }
    }
}

window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    sendTrackDataArrayToServer()
})

window['tracker'] = new Tracker()
