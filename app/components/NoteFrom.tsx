'use client';

import { Button, FormControl, FormLabel, Input, Textarea } from '@/components/common/chakra';
import { noteType } from '@/interfaces/type';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';

export default function NoteForm({ userId, note }: { userId: string; note?: noteType }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (note) {
      setDate(new Date(note.date));
      setTitle(note.title);
      setComment(note.comment);
    }
  }, [note]);

  const handleSaveClick = async (note?: noteType) => {
    setLoading(true);

    // 無理やりtimezone調整
    const yyyy = date.getFullYear().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const setDate = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);

    if (note) {
      await fetch(`/api/${userId}/note/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: setDate, title, comment }),
      });
    } else {
      await fetch(`/api/${userId}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: setDate, title, comment }),
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
            onClick={async () => await handleSaveClick(note)}
          >
            {note ? 'Update' : 'Save'}
          </Button>
        </FormControl>
      </Suspense>
    </div>
  );
}
