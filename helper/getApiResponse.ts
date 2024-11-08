type GetApiResponseProp = {
  apiHook: any;
  page?: number | undefined;
  limit?: number | undefined;
  id?: string | undefined;
};

async function getApiResponse({
  apiHook,
  page = undefined,
  limit = undefined,
  id = undefined,
}: GetApiResponseProp) {
  let data = null;
  let error = null;

  try {
    if (id) {
      data = await apiHook(id);
    } else if (page !== undefined && limit !== undefined) {
      data = await apiHook(page, limit);
    } else {
      data = await apiHook();
    }
  } catch (err) {
    error = err;
    console.error(error);
  }

  return { data, error };
}

export default getApiResponse;
