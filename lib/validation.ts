export function getRequiredError(value: string, message: string): string | undefined {
  if (!value.trim()) {
    return message;
  }

  return undefined;
}

export function getEmailError(value: string, requiredMessage: string, invalidMessage: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return requiredMessage;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return invalidMessage;
  }

  return undefined;
}

export function getMinLengthError(value: string, min: number, message: string): string | undefined {
  if (value.trim().length > 0 && value.trim().length < min) {
    return message;
  }

  return undefined;
}

export function isFormValid(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).every((error) => !error);
}
