import { writable, type Unsubscriber } from 'svelte/store'

export interface TodoOffline {
  id: number
  text: string
  done: boolean
}

export const todosOffline = writable<TodoOffline[]>([])
let unsubscribe: Unsubscriber | undefined

export const localStorageSub = (): void => {
  unsubscribe = todosOffline.subscribe((self) => {
    localStorage.setItem('todos', JSON.stringify(self))
  })
}

export const localStorageUnsub = (): void => {
  if (unsubscribe !== undefined) {
    unsubscribe()
  }
}

export const loadTodosOffline = (): void => {
  const todosJson = localStorage.getItem('todos')
  if (todosJson !== null) {
    todosOffline.set(JSON.parse(todosJson))
  }
}

export const addTodoOffline = (text: string): void => {
  todosOffline.update((self) => [{ id: Date.now(), text, done: false }, ...self])
}

export const deleteTodoOffline = (id: number): void => {
  todosOffline.update((self) => self.filter((todo) => todo.id !== id))
}

export const toggleTodoOffline = (id: number): void => {
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
