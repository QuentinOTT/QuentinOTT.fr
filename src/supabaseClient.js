import { createClient } from '@supabase/supabase-js'

// Remplacez ces valeurs par vos propres clés Supabase
const supabaseUrl = 'https://ycingmhzkgcvabnfiddw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljaW5nbWh6a2djdmFibmZpZGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2OTgxMjQsImV4cCI6MjA1ODI3NDEyNH0.5RH_dfEO08-s0ek4XTk4WqcNRH6jqnOIgdDNqdgGnmw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
