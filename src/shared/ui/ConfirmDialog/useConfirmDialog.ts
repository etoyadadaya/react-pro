import { useRef, useState } from 'react';

type ConfirmDialogOptions = {
  title: string;
  description: string;
};

type DialogState = ConfirmDialogOptions & {
  isOpen: boolean;
};

export function useConfirmDialog() {
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const closeDialog = (result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setDialogState(null);
  };

  const showConfirmDialog = (options: ConfirmDialogOptions) => {
    if (resolverRef.current) {
      resolverRef.current(false);
    }

    setDialogState({ ...options, isOpen: true });

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  return {
    dialogState,
    onCancel: () => closeDialog(false),
    onConfirm: () => closeDialog(true),
    showConfirmDialog,
  };
}
