import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: note, error } = await supabase
    .from('notes')
    .select()
    .eq('id', params.id)
    .limit(1)
    .single()

  if (error) {
    return <p>Something went wrong. Are you sure this note exists?</p>
  }

  return (
    <>
      <div>
        {note.title} | {params.id}
      </div>
      <Link href={`/note/${params.id}/edit`}>Edit Note</Link>
      <div>
        <pre>{JSON.stringify(note, null, 2)}</pre>
      </div>
    </>
  )
}
