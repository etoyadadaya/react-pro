import type { ActionReducerState } from '../model/types';
import { getFormValues } from './getFormValues';
import { isSameValues } from './isSameValues';

export const submitWithReducer = async (
  previousState: ActionReducerState,
  formData: FormData
): Promise<ActionReducerState> => {
  const values = getFormValues(formData);
  const dirty = !isSameValues(values, previousState.values);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    dirty,
    success: true,
    submitCount: previousState.submitCount + 1,
    values,
  };
};
