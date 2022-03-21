import { writable } from 'svelte/store'
import supabase from '$lib/supabase'

export interface Todo {
  id: number
  text: string
  done: boolean
}

export const todos = writable<Todo[]>([])

export const loadTodos = async (): Promise<void> => {
  const { data, error } = await supabase.from('todos').select()

  if (error !== null) {
    console.error(error)
    return
  }

  todos.set(data)
}

export const addTodo = async (text: string, userId: string): Promise<void> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ id: Date.now(), text, user_id: userId, done: false }])

  if (error !== null) {
    console.error(error)
    return
  }

  todos.update((self) => [data[0], ...self])
}

export const deleteTodo = async (id: number): Promise<void> => {
  const { error } = await supabase.from('todos').delete().match({ id })

  if (error !== null) {
    console.error(error)
    return
  }

  todos.update((self) => self.filter((todo) => todo.id !== id))
}

export const toggleTodo = async (id: number, currentState: boolean): Promise<void> => {
  const { error } = await supabase.from('todos').update({ done: !currentState }).match({ id })

  if (error !== null) {
    console.error(error)
    return
  }

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
