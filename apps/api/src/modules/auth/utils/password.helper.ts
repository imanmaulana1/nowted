import bcrypt from 'bcryptjs';

const GEN_SALT = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, GEN_SALT);
};

export const verifyPassword = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
