import type { SaveState } from '../model/types';

export const saveFormAction = async (
  previousState: SaveState,
  formData: FormData
): Promise<SaveState> => {
  const value = String(formData.get('title') ?? '').trim();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    lastSavedValue: value,
    saveCount: previousState.saveCount + 1,
  };
};
