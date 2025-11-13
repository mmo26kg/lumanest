'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(undefined)

const CART_STORAGE_KEY = 'lumanest_cart'

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage khi mounted
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart))
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error)
                localStorage.removeItem(CART_STORAGE_KEY)
            }
        }
        setIsLoaded(true)
    }, [])

    // Lưu cart vào localStorage mỗi khi thay đổi
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
        }
    }, [cart, isLoaded])

    // Thêm sản phẩm vào giỏ (tăng số lượng nếu đã tồn tại)
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }

            return [...prevCart, { ...product, quantity }]
        })
    }

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    // Xóa tất cả sản phẩm
    const clearCart = () => {
        setCart([])
    }

    // Tăng số lượng sản phẩm
    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    // Giảm số lượng sản phẩm (xóa nếu quantity = 1)
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    // Cập nhật số lượng trực tiếp
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    // Tính tổng số lượng sản phẩm
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    // Tính tổng tiền
    const totalPrice = cart.reduce((sum, item) => {
        const price = item.sale_price || item.price || 0
        return sum + price * item.quantity
    }, 0)

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        totalItems,
        totalPrice,
        isLoaded,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

