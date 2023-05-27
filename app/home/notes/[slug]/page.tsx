import NoteForm from '@/components/NoteFrom';

export default function EditNote({ params }: { params: { slug: string } }) {
  return (
    <div>
      <NoteForm slug={params.slug} />
    </div>
  );
}
