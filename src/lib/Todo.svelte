<script lang="ts">
  import octicons from '@primer/octicons'
  import { user } from '$stores/auth'
  import { deleteTodo, toggleTodo, type Todo } from '$stores/todos'
  import { deleteTodoOffline, toggleTodoOffline, type TodoOffline } from '$stores/todosOffline'

  export let todo: Todo | TodoOffline

  const checkIcon = octicons.check.toSVG({
    'aria-label': 'Toggle done',
    fill: 'currentColor'
  })
  const xIcon = octicons.x.toSVG({
    'aria-label': 'Delete',
    fill: 'currentColor'
  })
</script>

<li
  class="flex flex-col max-w-md w-full border rounded-lg
    {todo.done ? '!border-todo-gray !ring-todo-gray text-todo-gray' : 'border-todo-white'}"
>
  <!-- Todo text -->
  <input
    type="text"
    readonly
    value={todo.text}
    class="p-3 rounded-t-lg{todo.done ? ' line-through' : ''}"
  />

  <div class="flex justify-center">
    <!-- Toggle done button -->
    <button
      type="button"
      aria-label="Toggle done"
      class="p-3 hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-green focus-visible:text-todo-green
        {todo.done ? 'text-todo-green' : ''}"
      on:click={async () => {
        $user ? await toggleTodo(todo.id, todo.done) : toggleTodoOffline(todo.id)
      }}
    >
      {@html checkIcon}
    </button>

    <!-- Delete button -->
    <button
      type="button"
      aria-label="Delete"
      class="p-3 hover:bg-todo-gray/50 focus-visible:bg-todo-gray/50 hover:text-todo-red focus-visible:text-todo-red"
      on:click={async () => {
        $user ? await deleteTodo(todo.id) : deleteTodoOffline(todo.id)
      }}
    >
      {@html xIcon}
    </button>
  </div>
</li>
