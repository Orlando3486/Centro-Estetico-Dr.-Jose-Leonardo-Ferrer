import sgMail from "@sendgrid/mail";
export declare const sendEmail: (to: string, subject: string, text: string, html?: string) => Promise<[sgMail.ClientResponse, {}]>;
//# sourceMappingURL=emailService.d.ts.map