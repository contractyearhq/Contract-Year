import { supabase } from '../lib/supabase'
import Link from 'next/link'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const { data: ratings } = await supabase
    .from('ratings')
    .select('*')
    .order('published_at', { ascending: false })

  return <HomeClient ratings={ratings || []} />
}
