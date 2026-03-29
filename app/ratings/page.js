import { supabase } from '../../lib/supabase'
export const revalidate = 0
import RatingsClient from './RatingsClient'

export default async function RatingsPage() {
  const { data: ratings } = await supabase
    .from('ratings')
    .select('*')
    .order('published_at', { ascending: false })

  return <RatingsClient ratings={ratings || []} />
}
