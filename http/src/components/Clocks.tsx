import React from 'react'

const Clock = (props) => {
  const get_time = () => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    return new Date(utc + 3600000 * props.offset).toLocaleTimeString('ru-RU', {hour12: false})
  }

  const [time, set_time] = React.useState(get_time())

  React.useEffect(() => {
    const timer = setInterval(() => set_time(get_time()), 1000)
    return () => clearInterval(timer)
  }, [])

  return(
    <div className="relative border rounded-md p-4 pr-8 bg-white">
      <button onClick={props.onDelete} className="absolute top-1 right-1 text-red-500 font-bold">✕</button>
      <p className="font-bold">{props.name}</p>
      <p className="text-2xl font-mono">{time}</p>
    </div>
  )
}

const Clocks = () => {
  const [clocks, set_clocks] = React.useState([])
  const nameField = React.useRef(null)
  const offsetField = React.useRef(null)

  function add_clock(){
      if (!nameField.current.value || offsetField.current.value === "") return
      set_clocks(prev => [...prev, 
        { id: Date.now(),name: nameField.current.value, offset: Number(offsetField.current.value)}
      ])
      nameField.current.value = ''
      offsetField.current.value = ''
  }

  function delete_clock(id){
    set_clocks(prev => prev.filter(c => c.id !== id))
  }

  return(
    <div className="p-5">
      <div className="flex mb-5 gap-3 ">
        <input ref={nameField} onKeyDown={e => (e.key == "Enter" && add_clock())}
          className="flex-1  rounded-md border p-3 h-10" type="text" placeholder="название"/>
        <input ref={offsetField} onKeyDown={e => (e.key == "Enter" && add_clock())}
          className="w-32 h-10 rounded-md border p-3" type="number" placeholder="смещение"/>
        <button onClick={add_clock} className="h-10 bg-red-700 text-white px-4 rounded-md"> добавить </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {clocks.map(c => (
          <Clock key={c.id} name={c.name} offset={c.offset} onDelete={() => delete_clock(c.id)}/>
        ))}
      </div>
    </div>
  )
}

export default Clocks