import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from '@/components/common/chakra';
import dayjs from 'dayjs';
import NextLink from 'next/link';

interface DataType {
  id: string;
  title: string;
  comment: string;
  date: Date;
  createdAt: string;
}

async function getData() {
  const notes = await fetch(`${process.env.BASE_URL}/api/notes`, {
    cache: 'no-store',
  });
  return notes.json();
}

export default async function Home() {
  const notes: DataType[] = await getData();

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

function NoteCard({ note }: { note: DataType; key: number }) {
  return (
    <Card
      as={'li'}
      _hover={{
        boxShadow: 'xl',
      }}
      maxW="100%"
      minW="100%"
    >
      <NextLink href={`/home/notes/${note.id}`}>
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
