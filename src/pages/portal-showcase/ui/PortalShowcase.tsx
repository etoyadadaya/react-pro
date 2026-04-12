import { useState } from 'react';

import { ConfirmDialog } from 'shared/ui/ConfirmDialog/ConfirmDialog';
import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog';
import { Tooltip } from 'shared/ui/Tooltip/Tooltip';
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition';
import { ThemeProvider } from 'shared/theme/ThemeProvider';
import { useTheme } from 'shared/theme/useTheme';

import styles from './PortalShowcase.module.css';

function PortalShowcaseContent() {
  const { theme, toggleTheme } = useTheme();
  const { showConfirmDialog, dialogState, onCancel, onConfirm } =
    useConfirmDialog();

  const [outsideClicks, setOutsideClicks] = useState(0);

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    });

    if (confirmed) {
      window.alert('Элемент удален');
    }
  };

  return (
    <main className={`${styles.page} ${styles[theme]}`}>
      <div
        className={styles.card}
        onClick={() => setOutsideClicks((prev) => prev + 1)}
        role="presentation"
      >
        <h1>Portal showcase</h1>

        <p>
          Наведите на{' '}
          <Tooltip
            content="Подсказка отрендерена в #tooltip-root"
            position={TooltipPosition.Right}
          >
            <span className={styles.target}>этот текст</span>
          </Tooltip>
          , чтобы увидеть Tooltip.
        </p>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
            type="button"
          >
            Удалить
          </button>

          <button
            className={`${styles.button} ${styles.themeSwitch}`}
            onClick={toggleTheme}
            type="button"
          >
            Тема: {theme}
          </button>
        </div>

        <div className={styles.counterBox}>
          Клики по родительскому контейнеру (вне tooltip/dialog):{' '}
          {outsideClicks}
        </div>
      </div>

      {dialogState && (
        <ConfirmDialog
          description={dialogState.description}
          isOpen={dialogState.isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
          title={dialogState.title}
        />
      )}
    </main>
  );
}

export function PortalShowcase() {
  return (
    <ThemeProvider>
      <PortalShowcaseContent />
    </ThemeProvider>
  );
}
