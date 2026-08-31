// ─── Product ────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_at_price?: number
  images: string[]
  category: string
  brand: string
  sizes: string[]
  colors: string[]
  stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ─── Cart ───────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

// ─── Customer ───────────────────────────────────────────────────────────────

export interface Customer {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  addresses: Address[]
  created_at: string
}

export interface Address {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  is_default: boolean
}

// ─── Order ──────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  price: number
  size: string
  color: string
}

export interface Order {
  id: string
  customer_id: string
  items: OrderItem[]
  status: OrderStatus
  subtotal: number
  shipping: number
  discount: number
  total: number
  payment_method: string
  tracking_code?: string
  notes?: string
  created_at: string
  updated_at: string
}

// ─── Category ───────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}
