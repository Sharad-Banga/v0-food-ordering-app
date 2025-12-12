"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import type { FoodItem } from "@/app/page"

interface FoodDetailsScreenProps {
  item: FoodItem
  onBack: () => void
  onAddToCart: (quantity: number) => void
}

export function FoodDetailsScreen({ item, onBack, onAddToCart }: FoodDetailsScreenProps) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-32">
        {/* Food Image */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-muted">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="aspect-video w-full object-cover" />
        </div>

        {/* Food Info */}
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">{item.name}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        {/* Price */}
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Price</span>
            <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
          </div>
        </Card>

        {/* Quantity Selector */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-transparent"
                onClick={decrementQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[3ch] text-center text-xl font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-transparent"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4">
        <div className="container mx-auto">
          <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={() => onAddToCart(quantity)}>
            Add to Cart - ${(item.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}
