"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface OrderConfirmationScreenProps {
  orderId: string
  onTrackOrder: () => void
}

export function OrderConfirmationScreen({ orderId, onTrackOrder }: OrderConfirmationScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-accent/10 p-6">
            <CheckCircle2 className="h-16 w-16 text-accent" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Order Placed Successfully!</h1>
        <p className="mb-6 text-muted-foreground">Your order has been placed and will be delivered soon.</p>
        <Card className="mb-6 bg-secondary p-4">
          <p className="mb-1 text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono text-lg font-semibold">{orderId}</p>
        </Card>
        <Button className="w-full rounded-full py-6 text-lg" size="lg" onClick={onTrackOrder}>
          Track Order
        </Button>
      </Card>
    </div>
  )
}
