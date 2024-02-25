import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function update(formData: FormData, id: string) {
  'use server'
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  }

  const { error } = await supabase.from('notes').update(data).eq('id', id)

  console.log({ error })

  if (error) {
    // return redirect('/login?message=Could not authenticate user')
    redirect('/error')
  }

  redirect(`/note/${id}`)
}
