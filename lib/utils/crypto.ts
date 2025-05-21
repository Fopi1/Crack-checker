export const hashPassword = async (password: string) => {
  const { default: bcrypt } = await import("bcrypt");
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const { default: bcrypt } = await import("bcrypt");
  return await bcrypt.compare(password, hashedPassword);
};
