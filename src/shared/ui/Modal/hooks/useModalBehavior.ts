import { RefObject, useEffect, useRef } from 'react';

interface UseModalBehaviorParams {
	closeButtonRef: RefObject<HTMLButtonElement | null>;
	isOpen: boolean;
	onClose: () => void;
	triggerRef?: RefObject<HTMLElement | null>;
}

export const useModalBehavior = ({
	closeButtonRef,
	isOpen,
	onClose,
	triggerRef,
}: UseModalBehaviorParams) => {
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const focusTarget =
			triggerRef?.current ??
			(document.activeElement instanceof HTMLElement
				? document.activeElement
				: null);
		lastFocusedElementRef.current = focusTarget;

		const frameId = window.requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});

		const handleEscapeKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				onClose();
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscapeKeyDown);

		return () => {
			window.cancelAnimationFrame(frameId);
			document.body.style.overflow = previousOverflow;
			document.removeEventListener('keydown', handleEscapeKeyDown);
			(focusTarget ?? lastFocusedElementRef.current)?.focus();
		};
	}, [closeButtonRef, isOpen, onClose, triggerRef]);
};
