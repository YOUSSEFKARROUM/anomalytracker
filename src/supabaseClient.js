// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Il est FORTEMENT recommandé d'utiliser des variables d'environnement
// pour stocker ces informations sensibles.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)