'use client';

import { useState, useTransition } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button } from '../../common/chakra';
import { useRouter } from 'next/navigation';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

export default function CreateNote() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSaveClick = async () => {
    setLoading(true);
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, title, comment }),
    });
    setLoading(false);
    router.push('/');
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
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
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </FormControl>
    </div>
  );
}
