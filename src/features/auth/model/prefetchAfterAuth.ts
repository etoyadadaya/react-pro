import { productsApi } from '../../../shared/store/api/productsApi';
import { ProductsState } from '../../../shared/store/slices/products';
import { AppDispatch } from '../../../shared/store/types';

export const prefetchProductsAfterAuth = (
	dispatch: AppDispatch,
	productsState: ProductsState
) => {
	dispatch(
		productsApi.util.prefetch(
			'getProducts',
			{
				searchText: productsState.searchText,
				sort: productsState.sort,
				page: productsState.page,
				perPage: productsState.perPage,
			},
			{ force: true }
		)
	);
};
