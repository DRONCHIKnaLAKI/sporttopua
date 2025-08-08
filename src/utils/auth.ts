import { useEffect, useState } from "react"
import { supabase } from "../api/supabase"

const ADMIN_EMAIL = "your_admin_email@gmail.com" // ← замени на свой email

export function useAdminAuth() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email === ADMIN_EMAIL) setUser(data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user?.email === ADMIN_EMAIL) setUser(session.user)
      else setUser(null)
    })
    return () => listener?.subscription.unsubscribe()
  }, [])
  return {
    user,
    signIn: () => supabase.auth.signInWithOtp({ email: ADMIN_EMAIL }),
    signOut: () => supabase.auth.signOut()
  }
}