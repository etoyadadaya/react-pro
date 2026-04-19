import { useNavigate } from 'react-router-dom';
import BackSvg from './../../../assets/icons/back.svg?react';
import { Button } from '../../Button';

export const ButtonBack = () => {
	const navigate = useNavigate();
	return (
		<Button aria-label='Назад' onClick={() => navigate(-1)} variant='icon'>
			<BackSvg />
		</Button>
	);
};
