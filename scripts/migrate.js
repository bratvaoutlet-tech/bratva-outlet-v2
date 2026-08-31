import { createClient } from '@supabase/supabase-js'

// ORIGEM (Antigo - Lovable)
const OLD_URL = 'https://ibotiuzqjvqxoizpqhoi.supabase.co'
const OLD_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlib3RpdXpxanZxeG9penBxaG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDU1NjksImV4cCI6MjA5MTE4MTU2OX0._tg0vODbcsoeHlXvEONTFoyRapq2mAIQH7v2cjMJOYE'
const oldSupabase = createClient(OLD_URL, OLD_ANON_KEY)

// DESTINO (Novo - Bratva V2)
const NEW_URL = 'https://llxabeyoclwuvtkjoalh.supabase.co'
const NEW_SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseGFiZXlvY2x3dXZ0a2pvYWxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODIwMzEzNywiZXhwIjoyMTAzNzc5MTM3fQ.Fo-FoAKGG6sZsH1KyaFFvP0dGL39fzvIRnJdeHZhIIo'
const newSupabase = createClient(NEW_URL, NEW_SERVICE_ROLE)

const TABLES_TO_MIGRATE = [
  'products',
  'customers',
  'orders',
  'cart_items'
]

async function migrateData() {
  console.log('🔄 Iniciando migração de dados Lovable -> Bratva V2...')

  for (const table of TABLES_TO_MIGRATE) {
    console.log(`\n📦 Processando tabela [${table}]...`)
    
    // 1. Exportar do antigo
    const { data: oldData, error: errFetch } = await oldSupabase.from(table).select('*')
    
    if (errFetch) {
      // É normal algumas tabelas falharem caso não existam no antigo ou tenham RLS forte
      console.warn(`  ⚠️ Tabela ${table} não encontrada ou bloqueada no banco antigo: ${errFetch.message}`)
      continue
    }

    if (!oldData || oldData.length === 0) {
      console.log(`  ℹ️ Nenhum registro encontrado em ${table}.`)
      continue
    }

    console.log(`  ✔️ ${oldData.length} registros encontrados. Inserindo no destino...`)

    // 2. Importar no novo (Service Role ignora RLS)
    const { error: errInsert } = await newSupabase.from(table).insert(oldData)

    if (errInsert) {
      console.error(`  ❌ Erro ao inserir na tabela ${table}:`, errInsert.message)
    } else {
      console.log(`  ✅ ${oldData.length} registros migrados com sucesso para [${table}]!`)
    }
  }

  console.log('\n🎉 Processo de migração concluído!')
}

migrateData()
