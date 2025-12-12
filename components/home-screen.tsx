"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import type { FoodItem } from "@/app/page"
import { Badge } from "@/components/ui/badge"

const CATEGORIES = ["All", "Burgers", "Pizza", "Drinks", "Desserts"]

const MENU_ITEMS: FoodItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce and tomato",
    price: 12.99,
    image: "/classic-burger-with-lettuce.jpg",
    category: "Burgers",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil",
    price: 15.99,
    image: "/margherita-pizza.png",
    category: "Pizza",
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with melted cheese",
    price: 17.99,
    image: "/pepperoni-pizza.png",
    category: "Pizza",
  },
  {
    id: "4",
    name: "Cheese Burger",
    description: "Double patty with cheddar cheese",
    price: 14.99,
    image: "/cheese-burger-double-patty.jpg",
    category: "Burgers",
  },
  {
    id: "5",
    name: "Fresh Lemonade",
    description: "Homemade lemonade with mint",
    price: 4.99,
    image: "/fresh-mint-lemonade.png",
    category: "Drinks",
  },
  {
    id: "6",
    name: "Iced Coffee",
    description: "Cold brew coffee with ice",
    price: 5.99,
    image: "/iced-coffee-refreshment.png",
    category: "Drinks",
  },
  {
    id: "7",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 8.99,
    image: "/chocolate-cake-slice.png",
    category: "Desserts",
  },
  {
    id: "8",
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with toppings",
    price: 6.99,
    image: "/ice-cream-sundae.png",
    category: "Desserts",
  },
]

interface HomeScreenProps {
  onViewDetails: (item: FoodItem) => void
  onViewCart: () => void
  cartItemCount: number
}

export function HomeScreen({ onViewDetails, onViewCart, cartItemCount }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">QuickBite</h1>
          <Button variant="ghost" size="icon" className="relative" onClick={onViewCart}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-accent text-accent-foreground">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for food..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="shrink-0 rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
              onClick={() => onViewDetails(item)}
            >
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetails(item)
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
