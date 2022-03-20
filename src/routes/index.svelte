<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import TodoForm from '$lib/TodoForm.svelte'
  import Todo from '$lib/Todo.svelte'
  import { todos } from '../stores/todos'

  if (browser) {
    onMount(() => {
      const todosJson = localStorage.getItem('todos')

      if (todosJson !== null) {
        todos.set(JSON.parse(todosJson))
      }

      todos.subscribe((self) => {
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

  <ul class="max-w-md w-full mt-6 flex flex-col gap-y-6">
    {#each $todos.sort((a, b) => b.id - a.id) as todo (todo.id)}
      <Todo {todo} />
    {/each}
  </ul>
</section>
