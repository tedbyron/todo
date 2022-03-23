import { createClient } from '@supabase/supabase-js'

const { TODO_SUPABASE_KEY, TODO_SUPABASE_URL } = import.meta.env

const supabase = createClient(TODO_SUPABASE_URL, TODO_SUPABASE_KEY)
export default supabase
