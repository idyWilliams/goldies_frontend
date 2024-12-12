import instance from "@/services/api";

export const initPayment = async (paymentData: any) => {
   const response = await instance.post("/payments/initialize_payment", paymentData);
    console.log('resInitPayment is', response.data)
  return response.data;
};

export const detailsBillings = async (billingInfo: any) => {
   const response = await instance.post("/user/save_billing_details", billingInfo);
    console.log('resBillingInfo is', response.data)
  return response.data;
};

export const updateDetailsBillings = async (billingInfo: any) => { 
       const userId = billingInfo._id;  
  try {
    const response = await instance.post(`/user/update_billing_info/${userId}`, billingInfo);
    console.log('resUpdateBillingInfo is', response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating billing info:", error);
    throw error; 
  }
};

export const orderCreate = async (orderInfo: any) => {
   const response = await instance.post("/order/create_order", orderInfo);
    console.log('resOrderCreate is', response.data)
  return response.data;
};

 export const getOrderByUser = async () => {
  try {
    const response = await instance.get("/order/get_specific_user_order");
    console.log("userOrder", response.data);
    return response.data;
  } catch (error) {
    console.log('error getting user specific order', error)
    throw error
  }
}
 export const getOrderByOrderId = async (orderId: string) => {
  try {
    const response = await instance.get(`/order/get_order/${orderId}`);
    console.log("OrderByID", response.data);
    return response.data;
  } catch (error) {
    console.log('error getting user specific order by Id', error)
    throw error
  }
}

