export default function Header() {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">To Do List</h1>
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium py-2.5 px-5 rounded-full transition-colors shadow-sm">
                <span className="text-sm">Reiniciar</span>
            </button>
        </div>
    )
}
