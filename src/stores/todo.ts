import { writable } from 'svelte/store'

export type Todo = Array<{
  text: string
  completed: boolean
  id: number
}>

export const todos = writable<Todo>([])

export const addTodo = (text: string): void => {
  todos.update((cur) => [...todos, { text, completed: false, id: Date.now() }])
}

export const deleteTodo = (id: number): void => {
  todos.update((todos) => todos.filter((todo) => todo.id !== id))
}
