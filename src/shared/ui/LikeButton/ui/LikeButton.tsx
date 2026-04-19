import { startTransition, useOptimistic, useTransition } from 'react';
import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import classNames from 'classnames';
import { useAppSelector } from '../../../store/utils';
import { userSelectors } from '../../../store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../store/api/productsApi';
import { toast } from 'react-toastify';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);
	const [isPending, startLikeTransition] = useTransition();

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);
	const [optimisticIsLike, setOptimisticIsLike] = useOptimistic(isLike);

	const toggleLike = () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		const nextIsLike = !optimisticIsLike;

		startLikeTransition(() => {
			startTransition(async () => {
				setOptimisticIsLike(nextIsLike);

				const response = nextIsLike
					? await setLike({ id: `${product.id}` })
					: await deleteLike({ id: `${product.id}` });

				if (response.error) {
					const error = response.error as IErrorResponse;
					toast.error(error.data.message);
				}
			});
		});
	};

	return (
		<button
			aria-busy={isPending}
			aria-label={
				optimisticIsLike ? 'Убрать из избранного' : 'Добавить в избранное'
			}
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticIsLike,
				[s['card__favorite_is-pending']]: isPending,
			})}
			disabled={isPending}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
};
