import type { FormValues } from '../model/types';

export const isSameValues = (left: FormValues, right: FormValues): boolean => {
  return (
    left.firstName === right.firstName &&
    left.email === right.email &&
    left.about === right.about
  );
};
