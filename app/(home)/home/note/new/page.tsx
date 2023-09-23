import { redirect } from 'next/navigation';
import React from 'react';

import NoteForm from '@/components/NoteFrom';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';

export default async function CreateNote() {
  const session = await getNextAuthServerSession();
  if (!session?.user?.id) redirect('/');
  return (
    <div>
      <NoteForm userId={session?.user?.id} />
    </div>
  );
}
