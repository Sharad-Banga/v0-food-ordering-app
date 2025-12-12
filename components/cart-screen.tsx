"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/app/page"

interface CartScreenProps {
  cart: CartItem[]
  onBack: () => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onPlaceOrder: () => void
}

export function CartScreen({ cart, onBack, onUpdateQuantity, onPlaceOrder }: CartScreenProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Cart</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-48">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-4 text-lg text-muted-foreground">Your cart is empty</p>
            <Button onClick={onBack}>Browse Menu</Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="mb-6 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                          </Button>
                          <span className="min-w-[2ch] text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fixed Bottom Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4">
          <div className="container mx-auto space-y-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
            <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={onPlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
