import { createClient } from '@supabase/supabase-js'

const { TODO_SUPABASE_KEY, TODO_SUPABASE_URL } = import.meta.env

if (typeof TODO_SUPABASE_KEY !== 'string' || typeof TODO_SUPABASE_URL !== 'string') {
  throw new Error('Missing or invalid environment variables')
}

const supabase = createClient(TODO_SUPABASE_URL, TODO_SUPABASE_KEY)
export default supabase
