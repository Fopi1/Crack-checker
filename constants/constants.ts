export enum CookieToken {
  AUTH_TOKEN = "crack_token",
}

export const FormFieldsLength = {
  name: {
    minLength: 2,
    maxLength: 20,
  },
  password: {
    minLength: 8,
  },
} as const;
