import { createClient } from '@supabase/supabase-js'

// ORIGEM (Antigo - Lovable)
const OLD_URL = 'https://ibotiuzqjvqxoizpqhoi.supabase.co'
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlib3RpdXpxanZxeG9penBxaG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDU1NjksImV4cCI6MjA5MTE4MTU2OX0._tg0vODbcsoeHlXvEONTFoyRapq2mAIQH7v2cjMJOYE'
const oldSupabase = createClient(OLD_URL, OLD_KEY)

// DESTINO (Novo - Bratva V2)
// PREENCHER AQUI QUANDO O NOVO PROJETO FOR CRIADO
const NEW_URL = process.env.NEW_SUPABASE_URL || 'COLOQUE_A_URL_DO_NOVO_AQUI'
const NEW_KEY = process.env.NEW_SUPABASE_KEY || 'COLOQUE_A_CHAVE_DO_NOVO_AQUI'
const newSupabase = createClient(NEW_URL, NEW_KEY)

async function migrateData() {
  console.log('Iniciando migração de dados...')

  try {
    // 1. Migrar Produtos
    console.log('\n📦 Buscando produtos do antigo...')
    const { data: oldProducts, error: errProd } = await oldSupabase.from('products').select('*')
    
    if (errProd) {
      console.error('Erro ao buscar produtos:', errProd)
    } else if (oldProducts && oldProducts.length > 0) {
      console.log(`Encontrados ${oldProducts.length} produtos. Inserindo no novo...`)
      
      // Adaptar o formato dos dados se necessário para o schema do Bratva V2
      const { error: errInsertProd } = await newSupabase.from('products').insert(oldProducts)
      
      if (errInsertProd) console.error('Erro ao inserir produtos:', errInsertProd)
      else console.log('✅ Produtos migrados com sucesso!')
    } else {
      console.log('Nenhum produto encontrado no antigo.')
    }

    // Você pode adicionar mais tabelas aqui (ex: customers, orders)
    // Nota: orders e customers podem precisar de tratamento especial por causa de foreign keys e user_id (Auth).
    
    console.log('\n🎉 Migração finalizada!')
  } catch (error) {
    console.error('Erro fatal na migração:', error)
  }
}

migrateData()
