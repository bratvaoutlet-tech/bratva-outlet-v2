// ─── Supabase Database Types ────────────────────────────────────────────────
// Generated manually to match schema.sql.
// For auto-generation, run: npx supabase gen types typescript --local
// ─────────────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type SectionType =
  | 'hero'
  | 'banner'
  | 'carousel'
  | 'featured_products'
  | 'category_grid'
  | 'text_block'
  | 'custom_html'

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          auth_id: string | null
          email: string
          name: string
          phone: string | null
          cpf: string | null
          avatar_url: string | null
          address_street: string | null
          address_number: string | null
          address_complement: string | null
          address_neighborhood: string | null
          address_city: string | null
          address_state: string | null
          address_zip_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['customers']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          compare_at_price: number | null
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
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      orders: {
        Row: {
          id: string
          customer_id: string | null
          status: OrderStatus
          items: Record<string, unknown>[]
          subtotal: number
          shipping: number
          discount: number
          total: number
          payment_method: string | null
          tracking_code: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      cart_items: {
        Row: {
          id: string
          customer_id: string
          product_id: string
          quantity: number
          size: string | null
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cart_items']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['cart_items']['Insert']>
      }
      home_sections: {
        Row: {
          id: string
          type: SectionType
          title: string | null
          subtitle: string | null
          content: Record<string, unknown>
          image_url: string | null
          link_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['home_sections']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['home_sections']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      order_status: OrderStatus
      section_type: SectionType
    }
  }
}

// ─── Convenience aliases ────────────────────────────────────────────────────

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
