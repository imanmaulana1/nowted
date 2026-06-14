import { ConflictError } from '#/shared/errors/conflict.error.js';

import * as authRepository from './auth.repository.js';
import type { RegisterResponse } from './schemas/register-response.schema.js';
import type { RegisterBody } from './schemas/register.schema.js';
import { hashPassword } from './utils/password.helper.js';

export const register = async (
  payload: RegisterBody
): Promise<RegisterResponse> => {
  const existingUser = await authRepository.existsByEmail(payload.email);
  if (existingUser)
    throw new ConflictError({
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'An account with this email already exists',
    });

  const hashedPassword = await hashPassword(payload.password);

  const newUser = await authRepository.createUser({
    ...payload,
    password: hashedPassword,
  });

  return newUser;
};
