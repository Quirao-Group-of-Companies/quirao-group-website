// apps/web/src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const HR_EMAIL = process.env.HR_EMAIL || 'admin@example.com';

/**
 * Sends a notification when a new Inquiry is received
 */
export async function sendInquiryEmail(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}) {
  return await resend.emails.send({
    from: 'Website <onboarding@resend.dev>',
    to: [HR_EMAIL],
    subject: `New Inquiry: ${data.subject || 'No Subject'}`,
    html: `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}

/**
 * Sends a notification when a new Job Application is received
 */
export async function sendApplicationEmail(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  // --- NEW FIELDS ---
  sss: boolean;
  philhealth: boolean;
  pagIbig: boolean;
  // ------------------
  resumeFile: string;
  coverLetter?: string | null;
}) {
  // Helper to display boolean values nicely in the email
  const checkStatus = (val: boolean) =>
    val ? '<span style="color: green;">✔ Yes</span>' : '<span style="color: red;">✘ No</span>';

  return await resend.emails.send({
    from: 'Careers <onboarding@resend.dev>',
    to: [HR_EMAIL],
    subject: `New Job Application: ${data.fullName}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">New Job Application Received</h2>
        
        <p><strong>Applicant Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; font-size: 16px;">Government Benefits / IDs:</h3>
          <p style="margin: 5px 0;"><strong>SSS:</strong> ${checkStatus(data.sss)}</p>
          <p style="margin: 5px 0;"><strong>PhilHealth:</strong> ${checkStatus(data.philhealth)}</p>
          <p style="margin: 5px 0;"><strong>Pag-IBIG:</strong> ${checkStatus(data.pagIbig)}</p>
        </div>

        <p><strong>Resume Link:</strong> <a href="${data.resumeFile}" style="color: #0070f3; font-weight: bold;">View PDF Document</a></p>
        
        <p><strong>Cover Letter:</strong></p>
        <div style="background: #fff; border-left: 4px solid #ddd; padding-left: 15px; color: #555; font-style: italic;">
          ${data.coverLetter ? data.coverLetter.replace(/\n/g, '<br>') : 'No cover letter provided.'}
        </div>
      </div>
    `,
  });
}
