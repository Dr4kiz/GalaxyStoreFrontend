import { createContext, useState } from "react";

export const CartContext = createContext([{}, () => {}]);

export const CartProvider = ({ children }) => {
    const [state, setState] = useState([]);
    
    return (
        <CartContext.Provider value={[state, setState]}>
        {children}
        </CartContext.Provider>
    );
    }

