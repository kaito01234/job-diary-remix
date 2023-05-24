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

export default function NoteForm({ slug }: { slug?: string }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (slug) {
    useEffect(() => {
      const fetchNotes = async () => {
        const response = await await fetch(`/api/notes/${slug}`);
        const note: DataType = await response.json();
        setDate(new Date(note.date));
        setTitle(note.title);
        setComment(note.comment);
      };
      fetchNotes();
    }, []);
  }

  const handleSaveClick = async (slug?: string) => {
    setLoading(true);
    if (slug) {
      await fetch('/api/notes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: slug, date, title, comment }),
      });
    } else {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, title, comment }),
      });
    }
    setLoading(false);
    router.push('/');
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <Suspense fallback={'loading'}>
        <FormControl>
          <FormLabel>日付</FormLabel>
          <SingleDatepicker
            date={date}
            configs={{
              dateFormat: 'yyyy-MM-dd',
            }}
            onDateChange={setDate}
          />
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormLabel>本文</FormLabel>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button
            type="submit"
            color="white"
            bg="orange.400"
            isLoading={loading || isPending}
            mt={4}
            onClick={async () => await handleSaveClick(slug)}
          >
            {slug ? 'Update' : 'Save'}
          </Button>
        </FormControl>
      </Suspense>
    </div>
  );
}
