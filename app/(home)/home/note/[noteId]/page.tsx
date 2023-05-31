import NoteForm from '@/components/NoteFrom';
import { noteType } from '@/interfaces/type';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import { redirect } from 'next/navigation';

async function getData(userId: string, noteId: string) {
  const notes = await fetch(`${process.env.BASE_URL}/api/${userId}/note/${noteId}`, {
    cache: 'no-store',
  });
  return notes.json();
}

export default async function EditNote({ params }: { params: { noteId: string } }) {
  const session = await getNextAuthServerSession();
  if (!session?.user?.id) redirect('/');

  const note: noteType = await getData(session.user.id, params.noteId);

  return (
    <div>
      <NoteForm userId={session?.user?.id} note={note} />
    </div>
  );
}
