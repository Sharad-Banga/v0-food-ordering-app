"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Package, Truck, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUSES = [
  {
    id: "received",
    label: "Order Received",
    icon: Package,
  },
  {
    id: "preparing",
    label: "Preparing",
    icon: Package,
  },
  {
    id: "delivery",
    label: "Out for Delivery",
    icon: Truck,
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: CheckCircle,
  },
]

interface DeliveryTrackingScreenProps {
  orderId: string
  onBackToHome: () => void
}

export function DeliveryTrackingScreen({ orderId, onBackToHome }: DeliveryTrackingScreenProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)

  const nextStatus = () => {
    if (currentStatusIndex < STATUSES.length - 1) {
      setCurrentStatusIndex((prev) => prev + 1)
    }
  }

  const isCompleted = (index: number) => index <= currentStatusIndex
  const isCurrent = (index: number) => index === currentStatusIndex

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" onClick={onBackToHome}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Track Order</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Order ID */}
        <Card className="mb-8 p-4">
          <p className="mb-1 text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono text-lg font-semibold">{orderId}</p>
        </Card>

        {/* Status Timeline */}
        <div className="mb-8 space-y-8">
          {STATUSES.map((status, index) => {
            const Icon = status.icon
            const completed = isCompleted(index)
            const current = isCurrent(index)

            return (
              <div key={status.id} className="relative flex gap-4">
                {/* Vertical Line */}
                {index < STATUSES.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-5 top-12 h-16 w-0.5 transition-colors",
                      completed ? "bg-accent" : "bg-border",
                    )}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all",
                    completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {completed && !current ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3
                    className={cn(
                      "font-semibold transition-colors",
                      completed ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {status.label}
                  </h3>
                  {current && <p className="mt-1 text-sm text-muted-foreground">In progress...</p>}
                  {completed && !current && <p className="mt-1 text-sm text-accent">Completed</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {currentStatusIndex < STATUSES.length - 1 && (
            <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={nextStatus}>
              Next Status (Demo)
            </Button>
          )}
          {currentStatusIndex === STATUSES.length - 1 && (
            <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={onBackToHome}>
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
