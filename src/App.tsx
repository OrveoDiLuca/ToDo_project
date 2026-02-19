import { useState, useEffect } from "react"
import Header from "./components/Header"
import Form from "./components/Form"
import Tasks from "./components/Tasks"
import { getToday } from "./helpers/functions"
import type { Task } from "./types"

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks")
    return stored ? JSON.parse(stored) : []
  })
  const [editTasks, setEditTask] = useState<Task | null>(null)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <Header
        tasks={tasks}
        setTasks={setTasks}
      />
      <section className="bg-gray-100 px-5 py-8 min-h-screen flex flex-col items-center">
        <h2 className="text-lg font-bold mb-8 text-center">Today - {getToday()}</h2>

        <div className="w-full max-w-4xl">
          <Form
            tasks={tasks}
            setTasks={setTasks}
            editTasks={editTasks}
            setEditTask={setEditTask}
          />
          <div className="mt-10">
            {tasks.map((task) => (
              <Tasks
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                setEditTask={setEditTask}
              />
            ))}
          </div>

        </div>
      </section>

    </>

  )
}

export default App
