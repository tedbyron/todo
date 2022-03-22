<script lang="ts">
  import { user } from '$stores/auth'
  import { todos } from '$stores/todos'
  import { todosOffline } from '$stores/todosOffline'
  import Todo from '$lib/Todo.svelte'
  import TodoForm from '$lib/TodoForm.svelte'
</script>

<section class="container my-6 flex flex-col items-center">
  <TodoForm />

  {#if $user ? $todos.length > 0 : $todosOffline.length > 0}
    <ul class="max-w-md w-full mt-6 flex flex-col gap-y-6">
      {#each ($user ? $todos : $todosOffline).sort((a, b) => b.id - a.id) as todo (todo.id)}
        <Todo {todo} />
      {/each}
    </ul>
  {/if}
</section>
