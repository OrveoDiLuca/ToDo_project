import { v4 as uuidv4 } from "uuid"
import { useState, type FormEvent } from "react"
import type { Task } from "../types"
import { taskPriorities } from "../data/data"

type FormProps = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const initialState: Task = {
  id: '',
  priority: '1',
  task: '',
  isCompleted: false
}

function Form({ tasks, setTasks }: FormProps) {

  const [data, setData] = useState<Task>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const isValid = () => {
    const { task, priority } = data
    return task.trim() !== '' && priority.trim() !== ''
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTask: Task = {
      ...data,
      id: uuidv4(),
      task: data.task.trim()
    }

    setTasks([...tasks, newTask])
    setData(initialState)
  }
  return (
    <>
      <form
        className=""
        onSubmit={handleSubmit}
      >
        <div>
          <label>Tarea: </label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Escribe tu tarea. e.j: Comprar pan"
            value={data.task}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prioridad: </label>
          <select
            id="priority"
            name="priority"
            value={data.priority}
            onChange={handleChange}
          >
            {taskPriorities.map((priority) => (
              <option key={priority.id} value={priority.id}>{priority.name}</option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value={data.id ? 'Actualizar Tarea' : 'Agregar Tarea'}
          className="bg-gray-600 text-white rounded-lg hover:bg-gray-900 cursor-pointer w-full p-2 
          uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid()}
        />
      </form>
    </>
  )
}

export default Form