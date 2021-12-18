export const isJSONString = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};
