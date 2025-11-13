'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useCart } from '@/provider/CartProvider'

/**
 * @typedef {Object} CustomerInfo
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} ShippingAddress
 * @property {string} address
 * @property {string} city
 * @property {string} district
 */

/**
 * @typedef {Object} CheckoutData
 * @property {CustomerInfo} customer
 * @property {ShippingAddress} shipping
 * @property {string} shippingMethod - 'standard' | 'express'
 * @property {number} shippingCost
 * @property {string} paymentMethod - 'cod' | 'card' | 'bank'
 * @property {number} discountAmount
 * @property {string} [couponCode]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} OrderResponse
 * @property {boolean} success
 * @property {Object} [order]
 * @property {string} [error]
 */

export function useCheckout() {
    const supabase = createClient()
    const { cart, totalPrice, clearCart } = useCart()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    /**
     * Tạo order mới
     * @param {CheckoutData} checkoutData
     * @returns {Promise<OrderResponse>}
     */
    const createOrder = async (checkoutData) => {
        try {
            setIsSubmitting(true)
            setError(null)

            // Validate cart
            if (!cart || cart.length === 0) {
                throw new Error('Giỏ hàng trống')
            }

            // Validate customer info
            if (!checkoutData.customer.name || !checkoutData.customer.email || !checkoutData.customer.phone) {
                throw new Error('Vui lòng điền đầy đủ thông tin khách hàng')
            }

            // Validate shipping address
            if (!checkoutData.shipping.address) {
                throw new Error('Vui lòng điền địa chỉ giao hàng')
            }

            // Tính toán các giá trị
            const subtotal = totalPrice
            const taxAmount = 0 // Có thể thêm logic tính thuế nếu cần
            const totalAmount = subtotal + checkoutData.shippingCost - checkoutData.discountAmount + taxAmount

            // 1. Tạo order
            const { data: orderData, error: orderError } = await supabase
                .schema('lumanest')
                .from('order')
                .insert({
                    customer_name: checkoutData.customer.name,
                    customer_email: checkoutData.customer.email,
                    customer_phone: checkoutData.customer.phone,
                    shipping_address: checkoutData.shipping.address,
                    shipping_city: checkoutData.shipping.city,
                    shipping_district: checkoutData.shipping.district,
                    shipping_method: checkoutData.shippingMethod,
                    shipping_cost: checkoutData.shippingCost,
                    payment_method: checkoutData.paymentMethod,
                    discount_amount: checkoutData.discountAmount,
                    coupon_code: checkoutData.couponCode || null,
                    subtotal: subtotal,
                    tax_amount: taxAmount,
                    total_amount: totalAmount,
                    notes: checkoutData.notes || null,
                    status: 'pending'
                })
                .select()
                .single()

            if (orderError) throw orderError

            console.log('✅ Order created:', orderData)

            // 2. Tạo order items
            const orderItems = cart.map(item => ({
                order_id: orderData.id,
                product_variant_id: item.variant_id || null, // Nếu có variant
                quantity: item.quantity,
                price: item.sale_price || item.price,
                product_name_vi: item.name_vi,
                product_name_en: item.name_en,
                product_image_url: item.imageUrl
            }))

            const { data: orderItemsData, error: orderItemsError } = await supabase
                .schema('lumanest')
                .from('order_item')
                .insert(orderItems)
                .select()

            if (orderItemsError) {
                // Rollback order nếu tạo items thất bại
                await supabase
                    .schema('lumanest')
                    .from('order')
                    .delete()
                    .eq('id', orderData.id)

                throw orderItemsError
            }

            console.log('✅ Order items created:', orderItemsData)

            // 3. Clear giỏ hàng sau khi đặt hàng thành công
            clearCart()

            return {
                success: true,
                order: {
                    ...orderData,
                    items: orderItemsData
                }
            }

        } catch (err) {
            console.error('❌ Checkout error:', err)
            setError(err.message)
            return {
                success: false,
                error: err.message
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    /**
     * Validate coupon code
     * @param {string} code
     * @returns {Promise<{valid: boolean, discount: number}>}
     */
    const validateCoupon = async (code) => {
        try {
            // TODO: Implement coupon validation logic
            // const { data } = await supabase
            //     .schema('lumanest')
            //     .from('coupon')
            //     .select('*')
            //     .eq('code', code)
            //     .single()

            // For now, return mock data
            return {
                valid: false,
                discount: 0
            }
        } catch (err) {
            console.error('❌ Coupon validation error:', err)
            return {
                valid: false,
                discount: 0
            }
        }
    }

    return {
        createOrder,
        validateCoupon,
        isSubmitting,
        error
    }
}