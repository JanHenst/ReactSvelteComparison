<script lang="ts">
    import { goto } from '$app/navigation';
    import { userId } from "../store/userid.ts";
    userId.set(0)

    let username = '';
    let password = '';
    let error = '';
    const normalInputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    const errorInputClasses = "bg-red-50 border border-red-500 text-red-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
    const normalTextClasses = "block mb-2 text-sm font-medium text-gray-900"
    const errorTextClasses = "block mb-2 text-sm font-medium text-red-700"

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if (response.ok) {
                const data = await response.json();
                userId.set(data.id)
                await goto("/todo");
            } else {
                error = 'Failed to login';
            }
        } catch (error) {
            error = 'Failed to login';
        }
    };
</script>

<div>
    <form class="max-w-sm w-full mx-auto" on:submit={handleSubmit}>
        <div class="mb-5">
            <label for="username" class={error ? errorTextClasses : normalTextClasses}>
                Your username</label>
            <input type="text" id="username"
                   class={error ? errorInputClasses : normalInputClasses}
                   placeholder="JohnDoe"
                   bind:value={username}
                   required/>
        </div>
        <div class="mb-5">
            <label for="password" class={error ? errorTextClasses : normalTextClasses}>
                Your password</label>
            <input type="password" id="password"
                   class={error ? errorInputClasses : normalInputClasses}
                   bind:value={password}
                   required/>
        </div>
        {#if error}
            <p class="text-red-700 text-sm font-medium mb-5">{error}</p>
        {/if}
        <div class="mb-5">
            <a href="/register" class="text-blue-700 hover:underline">Make an account</a>
        </div>
        <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login
        </button>
    </form>
</div>