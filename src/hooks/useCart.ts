import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/cart'

export function useCart() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const items = useCartStore((s) => s.items)
  const addToCart = useCartStore((s) => s.addToCart)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotalPrice = useCartStore((s) => s.getTotalPrice())
  const getTotalItems = useCartStore((s) => s.getTotalItems())

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isHydrated,
  }
}
