const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { stopExceededLength } = require('./middleware/stopExceededLength')
const { Todo } = require('./models/sequelize')
const imgPath = '/image/day.jpg'

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Middlewares
app.use(stopExceededLength)
app.use(morgan('short'))

app.get('/todos', async (_req, res) => {
    const response = await Todo.findAll()
    res.json(response)
})

app.post('/todos', async (req, res) => {
    try {
        const todo = req.body
        if (!todo.text) {
            throw new Error('Invalid parameters')
        }
        const newTodo = await Todo.create({
            text: todo.text,
            done: false
        })
        return res.json(newTodo)
    } catch (e) {
        console.log("Error: --- ", e.message)
    }
})

app.post('/todos/:id', async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    if (todo === null)
        throw new Error('Not found this id ' + id)
    todo.done = !todo.done
    await todo.save()
    return res.json(todo)
})

app.get('/image', (_req, res) => {
    res.sendFile(imgPath, { root : __dirname })
})

app.get('/healthz', async (_req, res) => {
    try {
        const response = await Todo.findAll()
        if (response)
            return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
})

const PORT = 3005

app.listen(PORT, () => {
    console.log('server is listen at ' + PORT)
})