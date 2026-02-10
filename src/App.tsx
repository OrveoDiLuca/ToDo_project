import { useState } from "react"
import Header from "./components/Header"
import Form from "./components/Form"
import { getToday } from "./helpers/functions"
import type { Task } from "./types"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  console.log(tasks)

  return (
    <>
      <Header />
      <section className="bg-gray-100 px-5 py-20">
        <h2 className="text-lg font-bold ">Today - {getToday()}</h2>

        <div className="max-w-4xl mx-auto">
          <Form 
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </section>

    </>

  )
}

export default App
