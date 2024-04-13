<script lang="ts">
    export let todo;
    export let deleteTodo;
    export let updateTodo;
</script>

<li class="flex mb-2">
    <input
            type="text"
            class="border-2 border-gray-300 p-2 rounded-lg"
            bind:value={todo.task}
            on:input={() => updateTodo(todo.id, todo.task)}
    />
    <p class="text-2xl font-semibold text-gray-900 ml-2 mr-2">{todo.status}</p>
    <button
            class="bg-red-500 text-white p-2 rounded-lg ml-2"
            on:click={() => deleteTodo(todo.id)}
    >
        Delete
    </button>
</li>