import * as Crypto from "expo-crypto";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return "Please enter your email.";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "Please enter your password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Use letters and numbers in your password.";
  }
  return undefined;
}

export function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Please enter your name.";
  if (trimmed.length < 2) return "Name should be at least 2 characters.";
  return undefined;
}

export function validateSignup(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): AuthErrors {
  const errors: AuthErrors = {};
  const nameErr = validateName(input.name);
  const emailErr = validateEmail(input.email);
  const passwordErr = validatePassword(input.password);

  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  if (!input.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export function validateLogin(input: {
  email: string;
  password: string;
}): AuthErrors {
  const errors: AuthErrors = {};
  const emailErr = validateEmail(input.email);
  const passwordErr = validatePassword(input.password);
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  return errors;
}

export async function hashPassword(password: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
}
