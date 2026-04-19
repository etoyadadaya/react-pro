import { RefObject } from 'react';
import { useAppSelector } from '../../../../shared/store/utils';
import { cartSelectors } from '../../../../shared/store/slices/cart';
import { Modal } from '../../../../shared/ui/Modal';
import { Button } from '../../../../shared/ui/Button';
import s from './CheckoutModal.module.css';

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	triggerRef: RefObject<HTMLButtonElement | null>;
}

export const CheckoutModal = ({
	isOpen,
	onClose,
	onConfirm,
	triggerRef,
}: CheckoutModalProps) => {
	const products = useAppSelector(cartSelectors.getCartProducts);
	const { allDiscount, allPrice, productsCount, totalPrice } = useAppSelector(
		cartSelectors.getCartSummary
	);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Подтверждение заказа'
			triggerRef={triggerRef}>
			<p className={s.description}>
				Проверьте состав корзины перед отправкой заказа.
			</p>
			<div className={s.summary}>
				<div className={s.summaryRow}>
					<span>Товаров</span>
					<span>{productsCount}</span>
				</div>
				<div className={s.summaryRow}>
					<span>Стоимость</span>
					<span>{allPrice} ₽</span>
				</div>
				<div className={s.summaryRow}>
					<span>Скидка</span>
					<span className={s.discount}>{allDiscount} ₽</span>
				</div>
				<div className={s.summaryRow}>
					<span className={s.totalLabel}>Итого</span>
					<span className={s.totalValue}>{totalPrice} ₽</span>
				</div>
			</div>
			<div className={s.items}>
				<h3 className={s.itemsTitle}>Состав заказа</h3>
				<ul className={s.list}>
					{products.map((product) => (
						<li className={s.item} key={product.id}>
							<div className={s.itemInfo}>
								<span className={s.itemName}>{product.name}</span>
								<span className={s.itemCount}>{product.count} шт.</span>
							</div>
							<span className={s.itemPrice}>
								{product.price * product.count -
									product.discount * product.count}{' '}
								₽
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className={s.actions}>
				<Button onClick={onClose} variant='secondary'>
					Вернуться в корзину
				</Button>
				<Button onClick={onConfirm}>Подтвердить заказ</Button>
			</div>
		</Modal>
	);
};
