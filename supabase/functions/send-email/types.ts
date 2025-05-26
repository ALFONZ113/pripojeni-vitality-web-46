
export interface EmailRequest {
  to: string;
  subject: string;
  emailType?: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    zip?: string;
    propertyType?: string;
    currentProvider?: string;
    currentPrice?: string;
    message?: string;
  };
}
