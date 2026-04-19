import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { Button } from '../../../../shared/ui/Button';
import { Rating } from '../../../../shared/ui/Rating';
import s from './ReviewForm.module.css';

export const ReviewForm = () => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	};

	const handleClick = () => {
		console.log('Отправка: ', { reviewText, rating });
	};

	return (
		<form className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={handleChange}></textarea>
			<Button
				className={classNames(s['form__btn'])}
				type='submit'
				onClick={handleClick}>
				Отправить отзыв
			</Button>
		</form>
	);
};
