import { writable } from 'svelte/store'
import type { Todo } from './todos'

export const todosOffline = writable<Todo[]>([])

export const addTodo = (text: string): void => {
  todosOffline.update((self) => [{ id: Date.now(), text, done: false }, ...self])
}

export const deleteTodo = (id: number): void => {
  todosOffline.update((self) => self.filter((todo) => todo.id !== id))
}

export const toggleTodo = (id: number): void => {
  todosOffline.update((self) => {
    const idx = self.findIndex((todo) => todo.id === id)
    const todo = self[idx]

    if (todo !== undefined) {
      todo.done = !todo.done
      self[idx] = todo
    }

    return self
  })
}
