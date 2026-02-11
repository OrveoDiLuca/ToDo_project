import { useMemo } from "react"
import { taskPriorities } from "../data/data"
import type { Task } from "../types"

type TasksProps = {
    task: Task,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function Tasks({ task, setTasks }: TasksProps) {

    const priorityName = useMemo(() => taskPriorities.find(pri => pri.id === task.priority)?.name || "", [task.priority])

    const priorityStyles: Record<string, string> = {
        '1': 'bg-green-100 text-green-700',   // Baja
        '2': 'bg-yellow-100 text-yellow-700', // Media
        '3': 'bg-red-100 text-red-700',       // Alta
    }

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 mb-4 hover:shadow-md transition-all duration-300">
            <button
                className="w-6 h-6 rounded-full border-2 border-gray-300 mt-1 flex-shrink-0 hover:border-blue-500 transition-colors cursor-pointer"
            />

            <div className="flex flex-col gap-1 w-full">
                <p className="text-lg font-semibold text-gray-800">{task.task}</p>
                <div className="flex gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityStyles[task.priority] || 'bg-gray-100 text-gray-600'}`}>
                        {priorityName}
                    </span>
                </div>
            </div>
        </div>
    )
}
