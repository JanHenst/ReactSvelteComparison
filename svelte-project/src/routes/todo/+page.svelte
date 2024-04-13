<script lang="ts">
    import type { Todo } from "../../interfaces/todo";
    import { onMount } from "svelte";
    import { userId } from "../../store/userid.ts";
    import TodoItem from "./TodoItem.svelte";

    userId.load();
    let todos: Todo[] = [];
    let newTodo: Todo = { id: 0, task: '', status: 'active' };

    onMount(() => {
        console.log("HELLO")
        console.log('User ID:', $userId)
        console.log("Todos:", todos)

        fetch(`http://localhost:3000/users/${$userId}/todos`)
            .then(response => response.json())
            .then(data => todos = data);

        console.log("Todos grapped now cool:", todos)
    });

    const addTodo = () => {
        fetch(`http://localhost:3000/users/${$userId}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTodo?.task, status: 'pending' })
        })
            .then(response => response.json())
            .then(todo => {
                todos = [...todos, todo];
            });

        newTodo.task = '';
    };

    const deleteTodo = (id: number) => {
        fetch(`http://localhost:3000/users/${$userId}/todos/${id}`, {
            method: 'DELETE'
        })
            .then(() => todos = (todos.filter(todo => todo.id !== id)));
    };

    const updateTodo = (id: number, updatedTask: string) => {
        fetch(`http://localhost:3000/users/${$userId}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: updatedTask, status: 'active' })
        })
            .then(response => response.json())
            .then(updatedTodo => todos = (todos.map(todo => todo.id === id ? updatedTodo : todo)));
    };
</script>

<div>
    <div class="max-w-sm w-full mx-auto">
        <h1 class="text-4xl font-semibold text-gray-900 mb-10">Todos</h1>
        <ul class="mb-10">
            {#each todos as todo (todo.id)}
                <TodoItem {todo} {deleteTodo} {updateTodo} />
            {/each}
        </ul>
        <input
                type="text"
                class="border-2 border-gray-300 p-2 rounded-lg"
                bind:value={newTodo.task}
                on:input={() => newTodo = {id: Date.now(), task: newTodo.task, status: 'active'}}
        />
        <button
                class="bg-blue-500 text-white p-2 rounded-lg ml-2"
                on:click={addTodo}
        >
            Add Todo
        </button>
    </div>
</div>