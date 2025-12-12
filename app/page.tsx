"use client"

import { HomeScreen } from "@/components/home-screen"
import { FoodDetailsScreen } from "@/components/food-details-screen"
import { CartScreen } from "@/components/cart-screen"
import { OrderConfirmationScreen } from "@/components/order-confirmation-screen"
import { DeliveryTrackingScreen } from "@/components/delivery-tracking-screen"
import { useState } from "react"

export type FoodItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type CartItem = FoodItem & {
  quantity: number
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "details" | "cart" | "confirmation" | "tracking">("home")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderId, setOrderId] = useState<string>("")

  const addToCart = (item: FoodItem, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const placeOrder = () => {
    const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setOrderId(newOrderId)
    setCurrentScreen("confirmation")
  }

  const viewDetails = (item: FoodItem) => {
    setSelectedFood(item)
    setCurrentScreen("details")
  }

  return (
    <main className="min-h-screen">
      {currentScreen === "home" && (
        <HomeScreen
          onViewDetails={viewDetails}
          onViewCart={() => setCurrentScreen("cart")}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      {currentScreen === "details" && selectedFood && (
        <FoodDetailsScreen
          item={selectedFood}
          onBack={() => setCurrentScreen("home")}
          onAddToCart={(quantity) => {
            addToCart(selectedFood, quantity)
            setCurrentScreen("home")
          }}
        />
      )}
      {currentScreen === "cart" && (
        <CartScreen
          cart={cart}
          onBack={() => setCurrentScreen("home")}
          onUpdateQuantity={updateQuantity}
          onPlaceOrder={placeOrder}
        />
      )}
      {currentScreen === "confirmation" && (
        <OrderConfirmationScreen orderId={orderId} onTrackOrder={() => setCurrentScreen("tracking")} />
      )}
      {currentScreen === "tracking" && (
        <DeliveryTrackingScreen
          orderId={orderId}
          onBackToHome={() => {
            setCart([])
            setCurrentScreen("home")
          }}
        />
      )}
    </main>
  )
}
