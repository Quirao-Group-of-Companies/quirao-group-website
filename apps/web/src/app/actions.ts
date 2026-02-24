'use server';

import {
  applicationForms,
  db,
  inquiries,
  insertApplicationSchema,
  insertInquirySchema,
} from '@repo/db';
import { revalidatePath } from 'next/cache';
import { after } from 'next/server';
import { logger } from '@/lib/axiom/server';
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
      logger.warn('Insert inquiry schema failed.');
      after(() => {
        logger.flush();
      });
      return { error: 'Validation failed' };
    }

    await db.insert(inquiries).values(validatedData.data);
    await sendInquiryEmail(validatedData.data);

    return { success: true };
  } catch (error) {
    logger.error(`"Failed to submit inquiry form. Server Error: ${error}"`);
    after(() => {
      logger.flush();
    });
    return { error: `"Failed to submit inquiry form. Server Error: ${error}"` };
  }
}

export async function submitApplication(formData: FormData) {
  try {
    const file = formData.get('resume_file') as File;

    const resumeUrl = await uploadResume(file);
    const rawData = {
      fullName: String(formData.get('full_name')),
      email: String(formData.get('email')),
      phone: formData.get('phone') ? String(formData.get('phone')) : null,
      address: formData.get('address') ? String(formData.get('address')) : null,
      sss: formData.get('sss') === 'on',
      philhealth: formData.get('philhealth') === 'on',
      pagIbig: formData.get('pag_ibig') === 'on',
      resumeFile: resumeUrl,
      coverLetter: formData.get('cover_letter') ? String(formData.get('cover_letter')) : null,
    };

    // console.log('Validating data with Zod...');
    const validatedData = insertApplicationSchema.safeParse(rawData);
    if (!validatedData.success) {
      // console.error('Zod Validation Failed:', validatedData.error.flatten());
      logger.warn('Insert application schema failed.');
      after(() => {
        logger.flush();
      });
      return { error: 'Validation failed', details: validatedData.error.flatten() };
    }

    await db.insert(applicationForms).values(validatedData.data);

    await sendApplicationEmail({
      fullName: validatedData.data.fullName,
      email: validatedData.data.email,
      phone: validatedData.data.phone,
      address: validatedData.data.address,
      sss: validatedData.data.sss ?? false,
      philhealth: validatedData.data.philhealth ?? false,
      pagIbig: validatedData.data.pagIbig ?? false,
      resumeFile: validatedData.data.resumeFile,
      coverLetter: validatedData.data.coverLetter,
    });

    revalidatePath('/admin/applications');
    return { success: true };
  } catch (error) {
    logger.error(`"Failed to submit application form. Server Error: ${error}"`);
    after(() => {
      logger.flush();
    });
    return { error: `Failed to submit application form. Server Error: ${error}` };
  }
}
