export const isJsonString = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};
