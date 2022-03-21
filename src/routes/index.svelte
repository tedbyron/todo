<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { todosOffline } from '$stores/todosOffline'
  import Todo from '$lib/TodoOffline.svelte'
  import TodoForm from '$lib/TodoForm.svelte'

  if (browser) {
    onMount(() => {
      const todosJson = localStorage.getItem('todos')

      if (todosJson !== null) {
        todosOffline.set(JSON.parse(todosJson))
      }

      return todosOffline.subscribe((self) => {
        localStorage.setItem('todos', JSON.stringify(self))
      })
    })
  }
</script>

<div class="flex justify-center my-6">
  <h1 class="font-serif border-b-8 rounded-b-sm text-5xl lg:text-6xl">Todo</h1>
</div>

<section class="container my-6 flex flex-col items-center">
  <TodoForm />

  {#if $todosOffline.length > 0}
    <ul class="max-w-md w-full mt-6 flex flex-col gap-y-6">
      {#each $todosOffline.sort((a, b) => b.id - a.id) as todo (todo.id)}
        <Todo {todo} />
      {/each}
    </ul>
  {/if}
</section>
