import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// ─── Environment Variables ──────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env and fill in your credentials.',
  )
}

// ─── Typed Supabase Client ──────────────────────────────────────────────────

export const supabase = createClient<Database>(
  supabaseUrl ?? '',
  supabaseAnonKey ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)

// ─── Helper: get current user ───────────────────────────────────────────────

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// ─── Helper: get current session ────────────────────────────────────────────

export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// ─── Table shortcuts (typed) ────────────────────────────────────────────────

export const db = {
  products: () => supabase.from('products'),
  orders: () => supabase.from('orders'),
  customers: () => supabase.from('customers'),
  cartItems: () => supabase.from('cart_items'),
  homeSections: () => supabase.from('home_sections'),
} as const
