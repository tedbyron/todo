import { writable } from 'svelte/store'

export interface Todo {
  text: string
  done: boolean
  id: number
}

export const todos = writable<Todo[]>([])

export const addTodo = (text: string): void => {
  todos.update((self) => [{ text, done: false, id: Date.now() }, ...self])
}

export const deleteTodo = (id: number): void => {
  todos.update((self) => self.filter((todo) => todo.id !== id))
}

export const toggleTodo = (id: number): void => {
  todos.update((self) => {
    const idx = self.findIndex((todo) => todo.id === id)
    const todo = self[idx]

    if (todo !== undefined) {
      todo.done = !todo.done
      self[idx] = todo
    }

    return self
  })
}
