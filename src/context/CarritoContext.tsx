import React, { createContext, useReducer, ReactNode, useContext } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

interface CartState {
  products: Product[];
  total: number;
}

type CartAction =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "REMOVE_PRODUCT"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

const initialState: CartState = {
  products: [],
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const existingProduct = state.products.find(p => p.id === action.payload.id);
      if (existingProduct) {
        // no usemos abreviaciones usemos el nombre completo
        return {
          ...state,
          products: state.products.map(p =>
            p.id === action.payload.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
    case "REMOVE_PRODUCT":
      // no usemos abreviaciones usemos el nombre completo
      const productToRemove = state.products.find(p => p.id === action.payload);
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        total: state.total - (productToRemove?.price || 0) * (productToRemove?.quantity || 0),
      };
    case "UPDATE_QUANTITY":
      // no usemos abreviaciones usemos el nombre completo
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id
            ? { ...p, quantity: action.payload.quantity }
            : p
        ),
        // no usemos abreviaciones usemos el nombre completo
        total: state.products.reduce(
          (sum, p) =>
            sum + (p.id === action.payload.id ? action.payload.quantity * p.price : p.quantity * p.price),
          0
        ),
      };
    default:
      return state;
  }
};


const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product) => void; 
}>({ state: initialState, dispatch: () => {}, addToCart: () => {} });

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

    // si bien el provider podemos exponer lo que necesitemos hay que delegarle una 'unica responsabilidad en este caso puede mantenerse solo exportando el state y el dispatch y que sea el consumidor que implemente el addToCart o en todo caso crearlo en un archivo aparte y que lo importe cuando sea necesario
  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
