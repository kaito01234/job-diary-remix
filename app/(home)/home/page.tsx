import dayjs from 'dayjs';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import { Card, CardBody, CardHeader, HStack, Heading, Text, VStack } from '@/components/common/chakra';
import { noteType } from '@/interfaces/type';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';

async function getData(userId: string) {
  const notes = await fetch(`${process.env.BASE_URL}/api/${userId}/note`, {
    cache: 'no-store',
  });
  return notes.json();
}

export default async function Home() {
  const session = await getNextAuthServerSession();
  if (!session?.user?.id) redirect('/');

  const notes: noteType[] = await getData(session.user.id);

  return (
    <div>
      <VStack spacing={4} as="ul">
        {notes.map((note, index) => (
          <NoteCard note={note} key={index} />
        ))}
      </VStack>
    </div>
  );
}

function NoteCard({ note }: { note: noteType; key: number }) {
  return (
    <Card
      as={'li'}
      _hover={{
        boxShadow: 'xl',
      }}
      maxW="100%"
      minW="100%"
    >
      <NextLink href={`/home/note/${note.id}`}>
        <HStack>
          <CardHeader>
            <Heading size="md">{dayjs(note.date).format('YYYY-MM-DD')}</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch">
              {note.title ? <Heading size="xs">{note.title}</Heading> : ''}
              <Text fontSize="sm">{note.comment}</Text>
            </VStack>
          </CardBody>
        </HStack>
      </NextLink>
    </Card>
  );
}
