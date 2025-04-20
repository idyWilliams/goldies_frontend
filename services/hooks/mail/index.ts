import instance from "@/services/api";

export const sendContactMail = async (data: any) => {
  const response = await instance.post("/mail/contact_us", data);
  return response.data;
};

export const subscribeNewsletter = async (data: any) => {
  const response = await instance.post("/mail/newsletter_subscriptions", data);
  return response.data;
};
