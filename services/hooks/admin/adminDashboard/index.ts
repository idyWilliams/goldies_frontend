import instance from "@/services/api";



// GET ADMIN INFO
export const getDashBoard = async () => {
  const response = await instance.get(`/admin-analytics/dashboard`);
  return response.data;
};
// GET ADMIN INFO
export const getExtendedDashBoard = async () => {
  const response = await instance.get(`/admin-analytics/extended-dashboard`);
  return response.data;
};


