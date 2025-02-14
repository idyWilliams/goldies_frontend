import instance from "@/services/api";

export const initPayment = async (paymentData: any) => {
  const response = await instance.post(
    "/payments/initialize_payment",
    paymentData,
  );
  console.log("resInitPayment is", response.data);
  return response.data;
};

export const verifyPayment = async (reference: string) => {
  const res = await instance.post(`/payments/verify_payment/${reference}`);

  return res.data;
};

export const saveBillingDetails = async (billingInfo: any) => {
  const response = await instance.post(
    "/user/save_billing_details",
    billingInfo,
  );
  console.log("resBillingInfo is", response.data);
  return response.data;
};

export const updateDetailsBillings = async (billingInfo: any) => {
  const id = billingInfo._id;
  try {
    const response = await instance.patch(
      `/user/update_billing_info/${id}`,
      billingInfo,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating billing info:", error);
    throw error;
  }
};
export const deleteBilling = async (id: string) => {
  try {
    const response = await instance.delete(`/user/delete_billing_info/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting billing info:", error);
    throw error;
  }
};

export const setDefaultBilling = async (id: string) => {
  try {
    const response = await instance.patch(
      `/user/update_default_billing_info/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting billing info:", error);
    throw error;
  }
};

export const getAllBllingInfo = async () => {
  const res = await instance.get(`/user/billing_info`);
  return res.data;
};

export const orderCreate = async (orderInfo: any) => {
  const response = await instance.post("/order/create_order", orderInfo);
  console.log("resOrderCreate is", response.data);
  return response.data;
};

export const getOrderByUser = async () => {
  try {
    const response = await instance.get("/order/get_specific_user_order");
    return response.data;
  } catch (error) {
    console.log("error getting user specific order", error);
    throw error;
  }
};
export const getOrderByOrderId = async (orderId: string) => {
  try {
    const response = await instance.get(`/order/get_order/${orderId}`);
    console.log("OrderByID", response.data);
    return response.data;
  } catch (error) {
    console.log("error getting user specific order by Id", error);
    throw error;
  }
};

export const adminGetAllOrders = async () => {
  try {
    const response = await instance.get(`/order/get_all_order`);
    return response.data;
  } catch (error) {
    console.log("error getting admin all orders", error);
    throw error;
  }
};
