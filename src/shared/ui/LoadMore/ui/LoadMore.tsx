import { Alert, Stack } from '@mui/material';
import { useRef } from 'react';
import { useLoadMore } from '../hooks/useLoadMore';
import { Loader } from '../../Loader';

export const LoadMore = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { isEndOfList, isFetching } = useLoadMore({ ref });

	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isFetching && <Loader size='sm' />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
