import React from 'react'


const Notes = () => {
  const [notes, set_notes] = React.useState([])
  const noteField = React.useRef(null)

  //получить все
  function get_notes(){
    fetch("http://localhost:7070/notes")
      .then(res => res.json())
      .then(data => set_notes(data))
  }

  React.useEffect(() => {
      get_notes()
  }, [])

  // добавить 
  function add_note(){
    if (!noteField.current.value) return
    fetch("http://localhost:7070/notes", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({content: noteField.current.value})
    }).then(get_notes)
    noteField.current.value = ''
  }

  //удалить
  function delete_note(id){
    fetch(`http://localhost:7070/notes/${id}`, {method: "DELETE"}).then(get_notes)
  }

  return(
    <div className="p-5">
      <div className="flex gap-3 mb-5">
        <input ref={noteField} onKeyDown={e => (e.key == "Enter" && add_note())}
          className="flex-1 h-10 rounded-md border p-3" type="text" placeholder="Новая заметка..."
        />
        <button onClick={add_note} className="h-10 w-10 bg-red-700 rounded-md text-white font-bold text-xl">+</button>
        <button onClick={get_notes} className="h-10 w-10 text-green-600 text-xl">R</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {notes.map(note => (
          <div key={note.id} className="relative border rounded-md p-4 pr-8 max-w-[280px] bg-white">
            <button onClick={() => delete_note(note.id)}
              className="absolute top-1 right-1 text-red-500 font-bold">✕
            </button>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes 