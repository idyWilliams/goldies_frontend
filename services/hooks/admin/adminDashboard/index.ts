import instance from "@/services/api";



// GET ADMIN INFO
export const getDashBoard = async () => {
  const response = await instance.get(`/admin-analytics/dashboard`);
  return response.data;
};
// GET ADMIN INFO
export const getExtendedDashBoard = async (period = "month") => {
  const response = await instance.get(
    `/admin-analytics/extended-dashboard?period=${period}`,
  );
  return response.data;
};


