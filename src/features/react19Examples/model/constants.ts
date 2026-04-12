import type { ActionReducerState, FormValues, SaveState, Todo } from './types';

export const initialValues: FormValues = {
  firstName: '',
  email: '',
  about: '',
} as const;

export const actionInitialState: ActionReducerState = {
  dirty: false,
  success: false,
  submitCount: 0,
  values: initialValues,
} as const;

export const formInitialState: SaveState = {
  lastSavedValue: '',
  saveCount: 0,
} as const;

export const initialTodos: Todo[] = [
  { id: 1, text: 'Изучить useActionState' },
  { id: 2, text: 'Изучить useOptimistic' },
] as const;
