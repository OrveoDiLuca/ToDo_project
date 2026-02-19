import { v4 as uuidv4 } from "uuid"
import { useState, useEffect} from "react"
import { type FormEvent } from "react"
import type { Task } from "../types"
import { taskPriorities } from "../data/data"

type FormProps = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  editTasks: Task | null,
  setEditTask: React.Dispatch<React.SetStateAction<Task | null>>
}

const initialState: Task = {
  id: '',
  priority: '1',
  task: '',
  isCompleted: false
}

function Form({ tasks, setTasks, editTasks, setEditTask }: FormProps) {
  const [data, setData] = useState<Task>(initialState)

  useEffect(() => {
    if (editTasks) {

      setData(editTasks)

    }
  }, [editTasks])

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
    if(data.id){
      //Editando la tarea.
      setTasks(tasks.map(t => t.id === data.id ? data : t))
      setEditTask(null)
      
    }else{
      const newTask: Task = {
        ...data,
        id: uuidv4(),
        task: data.task.trim()
      }

      setTasks([...tasks, newTask])
    }
    
    setData(initialState)
  }
  return (
    <>
      <form
        className="bg-gray-700 p-8 rounded-2xl shadow-lg max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Tarea: </label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Escribe tu tarea. e.j: Comprar pan"
            value={data.task}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-gray-500 focus:border-blue-500 focus:outline-none transition-colors text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Prioridad: </label>
          <select
            id="priority"
            name="priority"
            value={data.priority}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-gray-500 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer text-white"
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