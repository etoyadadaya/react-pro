import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { Button } from '../../../../../shared/ui/Button';
import { useAppSelector } from '../../../../../shared/store/utils';
import { cartSelectors } from '../../../../../shared/store/slices/cart';

export const CartAmount = () => {
	const { allDiscount, allPrice, productsCount, totalPrice } = useAppSelector(
		cartSelectors.getCartSummary
	);
	const order = useAppSelector(cartSelectors.getCartOrder);

	const handleSubmitCart = () => {
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	};

	return (
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
			<Button fullWidth onClick={handleSubmitCart}>
				Оформить заказ
			</Button>
		</div>
	);
};
