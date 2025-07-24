import React, { useEffect, useState } from 'react';

const TodoList = () => {
    const [addTask, setAddTask] = useState(false);
    const [list, setList] = useState({ title: "", description: "" });
    const [filter, setFilter] = useState("select your status");
    const [listData, setListData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem("list");
        const parseData = JSON.parse(localData);
        setListData(parseData || []);
    }, []);

    const handleChange = (e) => {
        setList({
            ...list,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = () => {
        const arr = [...listData];
        if (editIndex !== null) {
            arr[editIndex] = list;
        } else {
            arr.push(list);
        }

        setEditIndex(null);
        setListData(arr);
        setAddTask(false);
        handleReset();
        localStorage.setItem("list", JSON.stringify(arr));
    };

    const handleCancel = () => {
        setList({ title: "", description: "" });
    };

    const handleReset = () => {
        setList({ title: "", description: "" });
    };

    const handleCheckBox = (index) => {
        const arr = [...listData];
        arr[index].description = arr[index].description === "completed" ? "incompleted" : "completed";
        setListData(arr);
        localStorage.setItem("list", JSON.stringify(arr));
    };

    const handleEdit = (index) => {
        setList(listData[index]);
        setEditIndex(index);
        setAddTask(true);
    };

    const handleDelete = (index) => {
        const arr = [...listData];
        arr.splice(index, 1);
        setListData(arr);
        localStorage.setItem("list", JSON.stringify(arr));
    };

    const handleSort = () => {
        const arr = [...listData];
        arr.sort((a, b) => a.title.localeCompare(b.title));
        setListData(arr);
        localStorage.setItem("list", JSON.stringify(arr));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">ToDo List</h1>

            <div className="flex justify-between mb-4 gap-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setAddTask(!addTask)}
                >
                    {addTask ? "Hide Form" : "Add Task"}
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleSort}
                >
                    Sort A-Z
                </button>
            </div>

            {addTask && (
                <div className="bg-gray-100 p-4 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add / Edit Task</h2>

                    <div className="mb-4">
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={list.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter task title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium mb-1">Status</label>
                        <select
                            name="description"
                            value={list.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="select your status">Select Status</option>
                            <option value="completed">Completed</option>
                            <option value="incompleted">Incompleted</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleAdd}
                        >
                            Save Task
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <select
                    name="description"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="select your status">Filter by Status</option>
                    <option value="completed">Completed</option>
                    <option value="incompleted">Incompleted</option>

                </select>

            </div>

            <div className="space-y-4">
                {listData
                    .filter(data => filter === "select your status" || data.description === filter)
                    .map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-4 rounded shadow">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={item.description === "completed"}
                                    onChange={() => handleCheckBox(index)}
                                    className="w-5 h-5"
                                />
                                <div>
                                    <div className="text-lg font-medium">{item.title}</div>
                                    <div className={`text-sm ${item.description === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    );
};

export default TodoList;