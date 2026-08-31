import { supabase } from './supabase'

export const auth = {
  signUp: async (email: string, password: string, name?: string) => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })
  },

  signIn: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  signOut: async () => {
    return supabase.auth.signOut()
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },
}
