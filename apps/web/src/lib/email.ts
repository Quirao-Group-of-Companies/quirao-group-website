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
  number?: string | null;
  message: string;
}) {
  return await resend.emails.send({
    from: 'Inquiry <onboarding@resend.dev>',
    to: [HR_EMAIL],
    subject: `New Inquiry from ${data.name || data.email}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background-color: #000000; padding: 32px 40px;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #a1a1aa; text-transform: uppercase;">Incoming Message</p>
                    <h1 style="margin: 8px 0 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">General Inquiry</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 36px 40px;">

                    <!-- Sender Info -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9fb; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Full Name</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">${data.name || '—'}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Email Address</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">
                            <a href="mailto:${data.email}" style="color: #09090b; text-decoration: none;">${data.email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Phone Number</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">${data.number || '—'}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Message</p>
                    <div style="background-color: #f9f9fb; border-radius: 12px; border: 1px solid #e4e4e7; padding: 20px 24px;">
                      <p style="margin: 0; font-size: 15px; color: #3f3f46; line-height: 1.7; white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px 32px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">This message was submitted via the website contact form.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
  sss: boolean;
  philhealth: boolean;
  pagIbig: boolean;
  resumeFile: string;
  coverLetter?: string | null;
}) {
  const benefit = (label: string, active: boolean) => `
    <td style="padding: 10px 8px; text-align: center;">
      <div style="
        display: inline-block;
        background-color: ${active ? '#000000' : '#f4f4f5'};
        color: ${active ? '#ffffff' : '#a1a1aa'};
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        white-space: nowrap;
      ">${active ? '✔&nbsp; ' : '✘&nbsp; '}${label}</div>
    </td>
  `;

  return await resend.emails.send({
    from: 'Application <onboarding@resend.dev>',
    to: [HR_EMAIL],
    subject: `New Job Application: ${data.fullName}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background-color: #000000; padding: 32px 40px;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; color: #a1a1aa; text-transform: uppercase;">New Submission</p>
                    <h1 style="margin: 8px 0 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">Job Application</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 36px 40px;">

                    <!-- Applicant Info -->
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Applicant Information</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9fb; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Full Name</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">${data.fullName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Email Address</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">
                            <a href="mailto:${data.email}" style="color: #09090b; text-decoration: none;">${data.email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Phone Number</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">${data.phone || '—'}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Residential Address</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09090b;">${data.address || '—'}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Government Benefits -->
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Government Benefits</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9fb; border-radius: 12px; border: 1px solid #e4e4e7; margin-bottom: 28px;">
                      <tr>
                        ${benefit('SSS', data.sss)}
                        ${benefit('PhilHealth', data.philhealth)}
                        ${benefit('Pag-IBIG', data.pagIbig)}
                      </tr>
                    </table>

                    <!-- Resume -->
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Resume / CV</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                      <tr>
                        <td>
                          <a href="${data.resumeFile}" style="
                            display: inline-block;
                            background-color: #000000;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 14px 28px;
                            border-radius: 10px;
                            font-size: 13px;
                            font-weight: 700;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                          ">&#8599;&nbsp; View PDF Document</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Cover Letter -->
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #71717a; text-transform: uppercase;">Cover Letter / Message</p>
                    <div style="background-color: #f9f9fb; border-radius: 12px; border: 1px solid #e4e4e7; border-left: 4px solid #000000; padding: 20px 24px;">
                      <p style="margin: 0; font-size: 15px; color: #3f3f46; line-height: 1.7; font-style: italic; white-space: pre-wrap;">${
                        data.coverLetter
                          ? data.coverLetter.replace(/\n/g, '<br>')
                          : '<span style="color: #a1a1aa; font-style: normal;">No cover letter provided.</span>'
                      }</p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px 32px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">This application was submitted via the website careers form.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}
