const express = require('express')
const cors = require('cors')

const app = express()
let PORT = 7070 // если что поменять тут

app.use(cors())
app.use(express.json())

// заметки
var notes = [
  { id: 1, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, content: "Вторая тестовая заметка." }
]

// получить все
app.get('/notes', (req, res) => {
  // console.log('get notes')
  res.json(notes)
})

// добавить
app.post('/notes', function(req, res) {
  let content = req.body.content
  if (!content) { res.status(400).send('no content'); return }
  
  const n = {
    id: Date.now(),
    content: content
  }
  notes.push(n)
  // console.log('added:', n)
  res.json(n)
})

// удалить по id
app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(x => x.id != id)
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log('server on ' + PORT)
})