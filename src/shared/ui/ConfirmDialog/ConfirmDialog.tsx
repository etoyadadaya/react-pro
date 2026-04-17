import { createPortal } from 'react-dom';
import { useTheme } from 'shared/theme/useTheme';
import styles from './ConfirmDialog.module.css';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { theme } = useTheme();

  if (!isOpen) {
    return null;
  }

  const dialogRoot = document.getElementById('dialog-root');

  if (!dialogRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.backdrop} onClick={onCancel} role="presentation">
      <div
        aria-modal="true"
        className={`${styles.dialog} ${styles[theme]}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onCancel}
            type="button"
          >
            Отмена
          </button>

          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={onConfirm}
            type="button"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    dialogRoot
  );
}
