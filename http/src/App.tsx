import { useState } from 'react'
import Notes from './components/Notes'
import Clocks from './components/Clocks'

const App = () => {
  const [tab, set_tab] = useState("clocks")

  return(
    <div>
      <div className="flex gap-2 p-3 border-b bg-stone-200">
        <button onClick={() => set_tab("clocks")} className="px-4 py-2 rounded-md">Часы</button>
        <button onClick={() => set_tab("notes")} className="px-4 py-2 rounded-md">Заметки</button>
      </div>

      {tab == "clocks" ? <Clocks/> : <Notes/>}
    </div>
  )
}

export default App
