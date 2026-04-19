import { ReactNode, RefObject, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../Button';
import s from './Modal.module.css';

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title: string;
	triggerRef?: RefObject<HTMLElement | null>;
}

export const Modal = ({
	children,
	isOpen,
	onClose,
	title,
	triggerRef,
}: ModalProps) => {
	const titleId = useId();
	const closeButtonRef = useRef<HTMLButtonElement>(null);
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
	}, [isOpen, onClose, triggerRef]);

	if (!isOpen) {
		return null;
	}

	const modalRoot = document.getElementById('modal-root');

	if (!modalRoot) {
		return null;
	}

	return createPortal(
		<div className={s.overlay}>
			<button
				aria-label='Закрыть модальное окно'
				className={s.backdrop}
				onClick={onClose}
				type='button'
			/>
			<div
				aria-labelledby={titleId}
				aria-modal='true'
				className={s.modal}
				role='dialog'>
				<div className={s.header}>
					<h2 className={s.title} id={titleId}>
						{title}
					</h2>
					<Button
						aria-label='Закрыть модальное окно'
						className={s.closeButton}
						onClick={onClose}
						ref={closeButtonRef}
						variant='icon'>
						<span className={s.closeIcon}>&times;</span>
					</Button>
				</div>
				<div className={s.content}>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};
