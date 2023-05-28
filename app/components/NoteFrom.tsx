'use client';

import { Button, FormControl, FormLabel, Input, Textarea } from '@/components/common/chakra';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';

interface DataType {
  id: string;
  title: string;
  comment: string;
  date: Date;
  createdAt: string;
}

export default function NoteForm({ userId, noteId }: { userId: string; noteId?: string }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (noteId) {
      const fetchNotes = async () => {
        const response = await await fetch(`/api/${userId}/note/${noteId}`);
        const note: DataType = await response.json();
        setDate(new Date(note.date));
        setTitle(note.title);
        setComment(note.comment);
      };
      fetchNotes();
    }
  }, [userId, noteId]);

  const handleSaveClick = async (noteId?: string) => {
    setLoading(true);
    if (noteId) {
      await fetch(`/api/${userId}/note/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, title, comment }),
      });
    } else {
      await fetch(`/api/${userId}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, title, comment }),
      });
    }
    setLoading(false);
    router.push('/home');
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <Suspense fallback={'loading'}>
        <FormControl>
          <FormLabel>日付</FormLabel>
          <SingleDatepicker date={date} onDateChange={setDate} />
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormLabel>本文</FormLabel>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button
            type="submit"
            color="white"
            bg="green.400"
            isLoading={loading || isPending}
            mt={4}
            onClick={async () => await handleSaveClick(noteId)}
          >
            {noteId ? 'Update' : 'Save'}
          </Button>
        </FormControl>
      </Suspense>
    </div>
  );
}
