import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Notes() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/')
  }

  const { data: notes } = await supabase.from('notes').select()

  return (
    <>
      <h1 className="text-2xl">My Notes</h1>
      <Link href="/notes/add">Add Note</Link>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      {notes?.map((note) => (
        <Link href={`/note/${note.id}`}>{note.title}</Link>
      ))}
    </>
  )
}
