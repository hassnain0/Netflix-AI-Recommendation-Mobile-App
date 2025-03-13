import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqctcivhpbcynrrlsfpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3RjaXZocGJjeW5ycmxzZnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzQyMzAsImV4cCI6MjA1NzMxMDIzMH0.SMHTzeGFadYqbgeDja3KeWuosNuCHte122aaWWd7HyE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});