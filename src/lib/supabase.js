import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://devjqoacvmqzgwoxoddo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldmpxb2Fjdm1xemd3b3hvZGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODk1OTgsImV4cCI6MjA4MTQ2NTU5OH0.0X3MV0lNsdEBvFx8mNGxLCOCBlhkeBw4Yw-yVqQkEB4'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
