import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Substitua pelos dados do seu projeto no Supabase (Settings > API)
const SUPABASE_URL = 'https://mxlhhabcmdpdakvsjqwi.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bGhoYWJjbWRwZGFrdnNqcXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MTY4OTAsImV4cCI6MjA4NTQ5Mjg5MH0._AGhvh49LSGrMxm3_qRd5aGYQNhoWhfguJnMdvxFunc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Função auxiliar para verificar sessão
export const checkSession = async () => await supabase.auth.getSession();