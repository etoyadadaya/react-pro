import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: [],
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			state.products = [...state.products, action.payload];
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			state.products = state.products.map((p) => ({
				...p,
				count: p.id === action.payload.id ? action.payload.count : p.count,
			}));
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
	},
});

export const cartActions = { ...cartSlice.actions };

const getCartProducts = cartSlice.selectors.getCartProducts;

const getCartProductsCount = createSelector(getCartProducts, (products) => {
	return products.length;
});

const getCartSummary = createSelector(getCartProducts, (products) => {
	const allPrice = products.reduce((acc, product) => {
		return acc + product.price * product.count;
	}, 0);

	const allDiscount = products.reduce((acc, product) => {
		return acc + product.discount * product.count;
	}, 0);

	return {
		allDiscount,
		allPrice,
		productsCount: products.length,
		totalPrice: allPrice - allDiscount,
	};
});

const getCartOrder = createSelector(getCartProducts, (products) => {
	return products.map((product) => ({
		count: product.count,
		id: product.id,
	}));
});

export const cartSelectors = {
	...cartSlice.selectors,
	getCartOrder,
	getCartProductsCount,
	getCartSummary,
};
