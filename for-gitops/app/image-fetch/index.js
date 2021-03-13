const express = require('express')
const app = express()
const fs = require('fs')
const axios = require('axios')

const a = new Date()

const downloadImage = () => {
    let currentDay = a.getDate().toString()
    try {
        let day = fs.existsSync(`./src/image/${currentDay}.jpg`)
        if (!day) {
            throw new Error('current day does not exists')
        }
    } catch (err) {
        console.log(err.message)
        const res = axios('https://picsum.photos/1200', {responseType: 'stream'})
        .then(
            res => {
                res.data.pipe(fs.createWriteStream(`./src/image/${currentDay}.jpg`))
                res.data.pipe(fs.createWriteStream(`./src/image/day.jpg`))
            }
        )
        // remove previos day if exists
        if (fs.existsSync(`./src/image/${parseInt(currentDay) - 1}.jpg`)) {
            fs.unlinkSync(`./src/image/${parseInt(currentDay) - 1}.jpg`)
            console.log('unlinked')
        }
    }
}

function downloadImageDaily() {
    downloadImage()
    console.log('next day')
    setTimeout(downloadImageDaily, 86400000)
}

downloadImageDaily()

app.get('/healthz', (req, res) => {
    try {
        let day = fs.existsSync(`./src/image/day.jpg`)
        if (!day) {
            throw new Error('current day does not exists')
        }
        return res.sendStatus(200)
    } catch (err) {
        return res.sendStatus(500)
    }
})

const PORT = 3004

app.listen(PORT, () => {
    console.log(`Service is listen to `, PORT)
})