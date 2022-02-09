const isValidatePhone = (phone) => {
  const pattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return pattern.test(phone);
};
export const Validator = {
  isValidatePhone,
};
