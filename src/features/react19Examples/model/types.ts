export type Todo = {
  id: number;
  text: string;
  optimistic?: boolean;
};

export type FormValues = {
  firstName: string;
  email: string;
  about: string;
};

export type ActionReducerState = {
  dirty: boolean;
  success: boolean;
  submitCount: number;
  values: FormValues;
};

export type SaveState = {
  lastSavedValue: string;
  saveCount: number;
};
