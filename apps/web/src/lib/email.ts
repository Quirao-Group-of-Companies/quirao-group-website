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
    from: 'Website <onboarding@resend.dev>', // Use a verified domain in production
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
  resumeFile: string;
  coverLetter?: string | null;
}) {
  return await resend.emails.send({
    from: 'Careers <onboarding@resend.dev>',
    to: [HR_EMAIL],
    subject: `New Job Application: ${data.fullName}`,
    html: `
      <h2>New Job Application Received</h2>
      <p><strong>Applicant Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Resume Link:</strong> <a href="${data.resumeFile}">Click here to view PDF</a></p>
      <p><strong>Cover Letter:</strong></p>
      <p>${data.coverLetter || 'No cover letter provided.'}</p>
    `,
  });
}
