import instance from "@/services/api";

export const initPayment = async (paymentData: any) => {
   const response = await instance.post("/payments/initialize_payment", paymentData);
    console.log('res is', response.data)
  return response.data;
  
};
