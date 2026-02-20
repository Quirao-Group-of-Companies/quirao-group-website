import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Only create the client if we have the variables
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function uploadResume(file: File) {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check your environment variables.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `resumes/${fileName}`;

  const { data, error } = await supabase.storage.from('resumes').upload(filePath, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('resumes').getPublicUrl(data.path);

  return publicUrl;
}
