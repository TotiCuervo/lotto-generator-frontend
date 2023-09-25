"use client";

import { CartItem } from "@/types/CartItem";
import React, { useContext, ReactNode, useState, useEffect } from "react";

interface IContextProps {
    children: ReactNode;
}

export interface CartContextType {
    cartItems: CartItem[];
    openMenu: boolean;
    addToCart: (value: CartItem) => void;
    addMultipleToCart: (value: CartItem[]) => void;
    removeFromCart: (value: CartItem) => void;
    clearCart: () => void;
    toggleMenu: (value: boolean) => void;
}

export const CartContext = React.createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: IContextProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const cartItems = localStorage.getItem("cartItems");
            if (cartItems) {
                setCartItems(
                    JSON.parse(cartItems).map((item: CartItem) => ({
                        ...item,
                        drawing_date: new Date(item.drawing_date),
                    }))
                );
            } else {
                localStorage.setItem("cartItems", JSON.stringify([]));
            }
        }
    }, []);

    function addToCart(item: CartItem) {
        const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem.numbers === item.numbers && cartItem.lottery === item.lottery
        );

        if (itemIndex === -1) {
            const newCartItems = [...cartItems, item];
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    }

    function addMultipleToCart(items: CartItem[]) {
        let newCartItems: CartItem[] = [];

        items.forEach((item) => {
            const itemIndex = cartItems.findIndex(
                (cartItem) => cartItem.numbers === item.numbers && cartItem.lottery === item.lottery
            );

            if (itemIndex === -1) {
                newCartItems.push(item);
            }
        });

        if (newCartItems.length > 0) {
            newCartItems = [...cartItems, ...newCartItems];
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    }

    function removeFromCart(item: CartItem) {
        const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem.numbers === item.numbers && cartItem.lottery === item.lottery
        );

        if (itemIndex !== -1) {
            const newCartItems = cartItems.filter((cartItem, index) => index !== itemIndex);
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    }

    function clearCart() {
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
    }

    function toggleMenu(value: boolean) {
        setOpenMenu(value);
    }

    const contextValue = {
        cartItems,
        openMenu,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        clearCart,
        toggleMenu,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    return useContext(CartContext);
}
