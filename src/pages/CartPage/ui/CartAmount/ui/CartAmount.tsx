import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../../../shared/ui/Button';
import { useAppSelector } from '../../../../../shared/store/utils';
import { cartSelectors } from '../../../../../shared/store/slices/cart';
import { CheckoutModal } from '../../../../../features/cart';

export const CartAmount = () => {
	const { allDiscount, allPrice, productsCount, totalPrice } = useAppSelector(
		cartSelectors.getCartSummary
	);
	const order = useAppSelector(cartSelectors.getCartOrder);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
	const orderTriggerRef = useRef<HTMLButtonElement>(null);

	const handleOpenCheckoutModal = () => {
		setIsCheckoutModalOpen(true);
	};

	const handleCloseCheckoutModal = () => {
		setIsCheckoutModalOpen(false);
	};

	const handleSubmitCart = () => {
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
		toast.success('Заказ оформлен');
		handleCloseCheckoutModal();
	};

	return (
		<>
			<div className={classNames(s['cart-amount'])}>
				<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
				<div className={classNames(s['cart-amount__table'])}>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							{`Товары (${productsCount})`}
						</span>
						<span className={classNames(s['cart-amount__table-value'])}>
							{`${allPrice} ₽`}
						</span>
					</div>
					<div className={classNames(s['cart-amount__table-row'])}>
						<span className={classNames(s['cart-amount__table-title'])}>
							Скидка
						</span>
						<span
							className={classNames(
								s['cart-amount__table-value'],
								s['cart-amount__table-value-discount']
							)}>
							{`${allDiscount} ₽`}
						</span>
					</div>
				</div>
				<div className={classNames(s['cart-amount__total-cost'])}>
					<h2 className={classNames(s['cart-amount__total-cost-title'])}>
						Общая стоимость
					</h2>
					<span className={classNames(s['cart-amount__total-cost-value'])}>
						{`${totalPrice} ₽`}
					</span>
				</div>
				<Button
					fullWidth
					onClick={handleOpenCheckoutModal}
					ref={orderTriggerRef}>
					Оформить заказ
				</Button>
			</div>
			<CheckoutModal
				isOpen={isCheckoutModalOpen}
				onClose={handleCloseCheckoutModal}
				onConfirm={handleSubmitCart}
				triggerRef={orderTriggerRef}
			/>
		</>
	);
};
