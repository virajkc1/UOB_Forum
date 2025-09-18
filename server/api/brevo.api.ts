import * as Brevo from "@getbrevo/brevo";

const brevoAPI = new Brevo.TransactionalEmailsApi();
brevoAPI.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export async function sendVerificationEmail(
  email: string,
  name: string,
  code: string
) {
  const emailData = new Brevo.SendSmtpEmail();
  emailData.to = [{ email }];
  emailData.templateId = 1; // your Brevo template ID
  emailData.params = { name, code, email };
  await brevoAPI.sendTransacEmail(emailData);
}
