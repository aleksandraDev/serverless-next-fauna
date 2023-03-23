import { useReducer, createContext } from 'react';

const initialState = {
	cart: {},
};

const Context = createContext({});

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD_TO_CART':
			const item = state.cart[action.payload._id];
			return {
				...state,
				cart: (state.cart[action.payload._id] = item
					? { ...item, quantity: item.quantity + 1 }
					: { ...action.payload, quantity: 1 }),
			};
		case 'REMOVE_FROM_CART':
			const newCart = { ...state.cart };
			delete newCart[action.payload._id];
			return { ...state, cart: newCart };
		default:
			return state;
	}
}

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
