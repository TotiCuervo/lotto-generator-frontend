"use client";

import { claim } from "@/endpoints/claim";
import isComboEqual from "@/lib/isComboEqual";
import { getNextLotteryDate } from "@/methods/getNextLotteryDate";
import { CartItem } from "@/types/CartItem";
import { AxiosResponse } from "axios";
import React, { useContext, ReactNode, useState, useEffect } from "react";

interface IContextProps {
    children: ReactNode;
}

export interface CartContextType {
    cartItems: CartItem[];
    openMenu: boolean;
    addToCart: (value: CartItem) => void;
    addMultipleToCart: (value: CartItem[]) => void;
    handleError: (value: Error) => void;
    removeFromCart: (value: CartItem) => void;
    clearCart: () => void;
    toggleMenu: (value: boolean) => void;
    claimCart: () => Promise<AxiosResponse<any, any>>;
}

export interface Error {
    items: CartItem[];
    errorMessage: string;
}

export const CartContext = React.createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: IContextProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const cartJson = localStorage.getItem("cartItems");

            if (!cartJson) {
                localStorage.setItem("cartItems", JSON.stringify([]));
                return;
            }

            let cartItems = JSON.parse(cartJson);

            cartItems = cartItems.filter((item: CartItem) => {
                const nextDrawDate = getNextLotteryDate(item.combination.lottery);
                const drawingDate = new Date(item.drawing_date);
                return drawingDate.getTime() >= nextDrawDate.getTime();
            });

            setCartItems(
                cartItems.map((item: CartItem) => ({
                    ...item,
                    drawing_date: new Date(item.drawing_date),
                }))
            );
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(item: CartItem) {
        const itemIndex = cartItems.findIndex((cartItem) => isComboEqual(cartItem, item));

        if (itemIndex === -1) {
            const newCartItems = [...cartItems, item];
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    }

    function handleError(error: Error) {
        const newCatItems = cartItems.map((item) => {
            const itemIndex = error.items.findIndex((errorItem) => isComboEqual(errorItem, item));

            if (itemIndex === -1) {
                return item;
            } else {
                return {
                    ...item,
                    error: true,
                    errorMessage: error.errorMessage,
                };
            }
        });

        setCartItems(newCatItems);
    }

    function addMultipleToCart(items: CartItem[]) {
        let newCartItems: CartItem[] = [];

        items.forEach((item) => {
            const itemIndex = cartItems.findIndex((cartItem) => isComboEqual(cartItem, item));

            if (itemIndex === -1) {
                newCartItems.push(item);
            }
        });

        if (newCartItems.length > 0) {
            newCartItems = [...cartItems, ...newCartItems];
            setCartItems(newCartItems);
        }
    }

    function removeFromCart(item: CartItem) {
        const itemIndex = cartItems.findIndex((cartItem) => isComboEqual(cartItem, item));

        if (itemIndex !== -1) {
            const newCartItems = cartItems.filter((cartItem, index) => index !== itemIndex);
            setCartItems(newCartItems);
        }
    }

    function clearCart() {
        setCartItems([]);
    }

    function toggleMenu(value: boolean) {
        setOpenMenu(value);
    }

    async function claimCart() {
        return claim(cartItems);
    }

    const contextValue = {
        cartItems,
        openMenu,
        addToCart,
        addMultipleToCart,
        handleError,
        removeFromCart,
        clearCart,
        toggleMenu,
        claimCart,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    return useContext(CartContext);
}
