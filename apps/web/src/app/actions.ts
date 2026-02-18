'use server';

import {
  applicationForms,
  db,
  inquiries,
  insertApplicationSchema,
  insertInquirySchema,
} from '@repo/db';
import { revalidatePath } from 'next/cache';
import { sendApplicationEmail, sendInquiryEmail } from '@/lib/email';
import { uploadResume } from '@/lib/supabase';

export async function submitInquiry(formData: FormData) {
  try {
    const rawData = {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      subject: formData.get('subject') ? String(formData.get('subject')) : null,
      message: String(formData.get('message')),
    };

    const validatedData = insertInquirySchema.safeParse(rawData);
    if (!validatedData.success) {
      return { error: 'Validation failed' };
    }

    await db.insert(inquiries).values(validatedData.data);
    await sendInquiryEmail(validatedData.data);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to submit.' };
  }
}

export async function submitApplication(formData: FormData) {
  try {
    console.log('--- Starting Submission ---');

    const file = formData.get('resume_file') as File;
    console.log('File received:', file?.name, 'Size:', file?.size);

    console.log('Attempting Supabase Storage upload...');
    const resumeUrl = await uploadResume(file);
    console.log('Upload successful! URL:', resumeUrl);

    const rawData = {
      fullName: String(formData.get('full_name')),
      email: String(formData.get('email')),
      phone: formData.get('phone') ? String(formData.get('phone')) : null,
      address: formData.get('address') ? String(formData.get('address')) : null,
      resumeFile: resumeUrl,
      coverLetter: formData.get('cover_letter') ? String(formData.get('cover_letter')) : null,
    };

    console.log('Validating data with Zod...');
    const validatedData = insertApplicationSchema.safeParse(rawData);
    if (!validatedData.success) {
      console.error('Zod Validation Failed:', validatedData.error.flatten());
      return { error: 'Validation failed', details: validatedData.error.flatten() };
    }

    console.log('Inserting into Database...');
    await db.insert(applicationForms).values(validatedData.data);
    console.log('Database insert successful!');

    console.log('Sending Email...');
    await sendApplicationEmail(validatedData.data);
    console.log('Email sent!');

    revalidatePath('/admin/applications');
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error('CRITICAL ERROR DURING SUBMISSION:');
    console.error('Message:', errorMessage);

    return { error: `Server Error: ${errorMessage}` };
  }
}
