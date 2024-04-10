import { FC, useEffect, useState } from "react";
import { Todo } from "../model/todo";
import useUserId from "../hooks/user-id.hook.ts";

export const TodoPage: FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<Todo>();
    const { userId } = useUserId()

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}/todos`)
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = () => {
        fetch(`http://localhost:3000/users/${userId}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTodo?.task, status: 'pending' })
        })
            .then(response => response.json())
            .then(todo => setTodos([...todos, todo]));

        setNewTodo(undefined);
    };

    const deleteTodo = (id: number) => {
        fetch(`http://localhost:3000/users/${userId}/todos/${id}`, {
            method: 'DELETE'
        })
            .then(() => setTodos(todos.filter(todo => todo.id !== id)));
    };

    const updateTodo = (id: number, updatedTask: string) => {
        fetch(`http://localhost:3000/users/${userId}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: updatedTask, status: 'active' })
        })
            .then(response => response.json())
            .then(updatedTodo => setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo)));
    };

    return (
        <div className="max-w-sm w-full mx-auto">
            <h1 className="text-4xl font-semibold text-gray-900 mb-10">Todos</h1>
            <ul className="mb-10">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex mb-2">
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 rounded-lg"
                            value={todo.task}
                            onChange={(e) => updateTodo(todo.id, e.target.value)}
                        />
                        <p className="text-2xl font-semibold text-gray-900 ml-2 mr-2">{todo.status}</p>
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg ml-2"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                className="border-2 border-gray-300 p-2 rounded-lg"
                value={newTodo?.task || ''}
                onChange={(e) => setNewTodo({id: Date.now(), task: e.target.value, status: 'active'})}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                onClick={addTodo}
            >
                Add Todo
            </button>
        </div>
    )
}