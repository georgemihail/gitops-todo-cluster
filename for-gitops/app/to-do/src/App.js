import React, { useEffect, useState } from 'react'
import todosService from './services/todo'

const App = () => {
  const [tasks, setTask] = useState([])
  const [imgPath, setImage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await todosService.getTodos()
      setTask(res)
      return res
    }
    fetchData()
  }, [setTask])

  // Get image from a microservice
  useEffect(() => {
    todosService.getImage().then(res => setImage(res))
  }, [setImage])

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      let task = event.target.task.value
      const newTask = await todosService.addTodo({
        text: task,
        done: false
      })
      setTask(tasks.concat(newTask))
    } catch (e) {
      console.log('Error : ', e.message)
    }

    event.target.task.value = ''
  }

  const switchDone = async (id) => {
    const changedTodo = await todosService.changeDone(id)
    setTask(
      tasks.map((t) => t.id === id ? changedTodo : t)
    )
  }
  
  return(
    <div>
      <div>
        <h2 style={{"marginLeft": "130px"}}>
          To do
        </h2>
        <img src={imgPath} alt="welcome" width="400"/>
      </div>

      <form onSubmit={submitHandler}>
        <input name="task" />
        <button> Create TODO </button>
      </form>
      <div style={{"marginTop": "20px"}}>
        {tasks.map((task) => (
          <div key={task.id}>
            <li>
              { task.text }
              <button
                onClick={() => switchDone(task.id)}
              >
                { 
                task.done ? "Mark done" : "Mark undone"
                }
            </button>  
            </li>

          </div>
        ))}
      </div>
    </div>
  )
}
export default App;
