export const revalidate = 0
import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import ThrowbacksClient from './ThrowbacksClient'

export default async function ThrowbacksPage({ searchParams }) {
  const { data: throwbacks } = await supabase
    .from('throwbacks')
    .select('*')
    .order('contract_year', { ascending: false })

  const params = await searchParams
  const eraFilter = params.era || 'all'
  const leagueFilter = params.league || 'all'
  const verdictFilter = params.verdict || 'all'

  return (
    <ThrowbacksClient
      throwbacks={throwbacks || []}
      eraFilter={eraFilter}
      leagueFilter={leagueFilter}
      verdictFilter={verdictFilter}
    />
  )
}
