import {
  type CSSProperties,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from 'shared/theme/useTheme';

import { TooltipPosition } from './TooltipPosition';
import styles from './Tooltip.module.css';

type Coordinates = {
  top: number;
  left: number;
};

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  offset?: number;
};

export function Tooltip({
  children,
  content,
  position = TooltipPosition.Top,
  offset = 8,
}: TooltipProps) {
  const { theme } = useTheme();

  const triggerRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    top: 0,
    left: 0,
  });

  const tooltipRoot = useMemo(
    () => document.getElementById('tooltip-root'),
    []
  );

  const updatePosition = () => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();

    switch (position) {
      case TooltipPosition.Bottom:
        setCoordinates({
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2,
        });
        return;
      case TooltipPosition.Left:
        setCoordinates({
          top: rect.top + rect.height / 2,
          left: rect.left - offset,
        });
        return;
      case TooltipPosition.Right:
        setCoordinates({
          top: rect.top + rect.height / 2,
          left: rect.right + offset,
        });
        return;
      case TooltipPosition.Top:
      default:
        setCoordinates({
          top: rect.top - offset,
          left: rect.left + rect.width / 2,
        });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  const tooltipStyle: CSSProperties = {
    top: coordinates.top,
    left: coordinates.left,
    transform:
      position === TooltipPosition.Top || position === TooltipPosition.Bottom
        ? 'translate(-50%, 0)'
        : position === TooltipPosition.Left
          ? 'translate(-100%, -50%)'
          : 'translate(0, -50%)',
  };

  return (
    <span
      className={styles.wrapper}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && tooltipRoot
        ? createPortal(
            <span
              className={`${styles.tooltip} ${styles[theme]}`}
              role="tooltip"
              style={tooltipStyle}
            >
              {content}
            </span>,
            tooltipRoot
          )
        : null}
    </span>
  );
}
