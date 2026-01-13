export const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordStrong = (password) =>
  /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

export const validateLogin = ({ email, password }) => {
  if (!email || !password) return "All fields are required";
  if (!isEmailValid(email)) return "Invalid email format";
  return null;
};

export const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) return "All fields are required";
  if (!isEmailValid(email)) return "Invalid email format";
  if (!isPasswordStrong(password))
    return "Password must contain 1 uppercase letter and 1 number";
  return null;
};
