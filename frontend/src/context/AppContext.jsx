import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [orderStatus, setOrderStatus] = useState(() => {
        const savedStatus = localStorage.getItem('orderStatus');
        return savedStatus || 'Order Received';
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('orderStatus', orderStatus);
    }, [orderStatus]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const updateOrderStatus = (status) => {
        setOrderStatus(status);
    };

    return (
        <AppContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, user, login, logout, orderStatus, updateOrderStatus }}>
            {children}
        </AppContext.Provider>
    );
};
