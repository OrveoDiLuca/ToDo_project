import { useMemo } from "react"
import { taskPriorities } from "../data/data"
import type { Task } from "../types"
import { PencilSquareIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

type TasksProps = {
    task: Task,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    tasks: Task[], 
    setEditTask: React.Dispatch<React.SetStateAction<Task | null>>
}

export default function Tasks({ task, setTasks, tasks, setEditTask }: TasksProps) {

    const priorityName = useMemo(() => taskPriorities.find(pri => pri.id === task.priority)?.name || "", [task.priority])

    const priorityStyles: Record<string, string> = {
        '1': 'bg-green-100 text-green-700',   // Baja
        '2': 'bg-yellow-100 text-yellow-700', // Media
        '3': 'bg-red-100 text-red-700',       // Alta
    }

    const completeTask = () => {
        const updatedTask = {...task, isCompleted: !task.isCompleted}
        setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? updatedTask : t))
    }//Setea el estado de la tarea como completada o no, lo que hace es recorrer el array de tareas y si encuentra el id de la tarea seleccionada lo setea como completada o no. 

    const deleTask = () => {
        const updatedTask = tasks.filter(t => t.id !== task.id)
        setTasks(updatedTask)
    }

    const editTask = () => {
        setEditTask(task)
    }
    return (
        <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 mb-4 hover:shadow-md transition-all duration-300 ${task.isCompleted ? 'opacity-70 bg-gray-50' : ''}`}>
            <button
                className={`w-6 h-6 rounded-full border-2 mt-1 shrink-0 flex items-center justify-center cursor-pointer transition-colors ${task.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-500'}`}
                onClick={completeTask}
            >
                {task.isCompleted && <CheckCircleIcon className="w-4 h-4 text-white" />}
            </button>

            <div className="flex flex-col gap-1 w-full">
                <p className={`text-lg font-bold ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.task}
                </p>
                <div className="flex gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityStyles[task.priority] || 'bg-gray-100 text-gray-600'}`}>
                        {priorityName}
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={editTask}
                >
                    <PencilSquareIcon className="w-8 h-7 text-gray-500 cursor-pointer" />
                </button>
                <button 
                    onClick={deleTask}
                >
                    <XCircleIcon className="w-8 h-7 text-red-500 cursor-pointer" />
                </button>
            </div>
        </div>
    )
}
