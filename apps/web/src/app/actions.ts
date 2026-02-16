'use server';

import { db, inquiries, insertInquirySchema } from '@repo/db';
import { revalidatePath } from 'next/cache';

export async function submitInquiry(formData: FormData) {
  // Extract data from form
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  // 1. Validate the data against our Zod schema
  const validatedData = insertInquirySchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: 'Invalid form data', details: validatedData.error.flatten() };
  }

  try {
    // 2. Insert into Supabase via Drizzle
    await db.insert(inquiries).values(validatedData.data);

    // 3. Clear the cache so the admin sees the new entry
    revalidatePath('/admin/inquiries');

    return { success: true };
  } catch (_e) {
    return { error: 'Failed to submit inquiry' };
  }
}
