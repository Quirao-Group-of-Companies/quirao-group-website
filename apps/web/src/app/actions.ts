'use server';

import {
  applicationForms,
  db,
  inquiries,
  insertApplicationSchema,
  insertInquirySchema,
} from '@repo/db';
import { revalidatePath } from 'next/cache';

// --- Inquiry Logic (Already Correct) ---
export async function submitInquiry(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const validatedData = insertInquirySchema.safeParse(rawData);
  if (!validatedData.success) {
    return { error: 'Invalid form data', details: validatedData.error.flatten() };
  }

  try {
    await db.insert(inquiries).values(validatedData.data);
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (_e) {
    return { error: 'Failed to submit inquiry' };
  }
}

// --- Application Logic (Updated for Files) ---
export async function submitApplication(formData: FormData) {
  const file = formData.get('resume_file') as File;

  // 1. You need to upload the file to Supabase Storage first!
  // For now, let's assume we have a function to do this.
  const resumeUrl = '';
  if (file && file.size > 0) {
    // resumeUrl = await uploadResumeToSupabase(file);
    // We will build this next.
  }

  const rawData = {
    full_name: formData.get('full_name'), // Matched to schema column name
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    resume_file: resumeUrl || 'pending-upload', // This must be a string (URL)
    cover_letter: formData.get('cover_letter'),
  };

  const validatedData = insertApplicationSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: 'Invalid form data', details: validatedData.error.flatten() };
  }

  try {
    await db.insert(applicationForms).values(validatedData.data);
    revalidatePath('/admin/applications');
    return { success: true };
  } catch (_e) {
    console.error(_e);
    return { error: 'Failed to submit application' };
  }
}
