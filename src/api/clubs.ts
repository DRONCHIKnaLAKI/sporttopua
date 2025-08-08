import { supabase } from './supabase'
import { Club } from '../types'

export async function getClubs(): Promise<Club[]> {
  const { data, error } = await supabase.from('clubs').select('*')
  if (error) return []
  return data
}