import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqctcivhpbcynrrlsfpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3RjaXZocGJjeW5ycmxzZnBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTczNDIzMCwiZXhwIjoyMDU3MzEwMjMwfQ.TuQuYIGHrviXVSedbymUS1qL7aEBvXxatrmimqEo2Sc';

export const supabase = createClient(supabaseUrl, supabaseKey);