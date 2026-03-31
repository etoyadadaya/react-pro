export const normalizeToken = (value: string | null) => {
  if (!value) {
    return null;
  }

  return value.startsWith('Bearer ') ? value : `Bearer ${value}`;
};
