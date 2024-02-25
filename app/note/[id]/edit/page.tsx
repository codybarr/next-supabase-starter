import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { update } from './actions'

export default async function Page({ params }: { params: { id: string } }) {
  async function updateNote(formData: FormData) {
    'use server'
    await update(formData, params.id)
  }

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
      <div>My Note: {params.id}</div>
      <div>
        <pre>{JSON.stringify(note, null, 2)}</pre>
      </div>
      <form action={updateNote}>
        <input
          className="px-2 py-1 border border-border rounded"
          type="text"
          defaultValue={note.title}
          name="title"
          placeholder="title"
        />
        <textarea
          className="px-2 py-1 border border-border rounded"
          defaultValue={note.description}
          name="description"
          placeholder="description"
        />
        <input type="hidden" name="id" value={params.id} />
        <button type="submit">Save Note</button>
      </form>
    </>
  )
}
