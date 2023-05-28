import { Box, Container, Heading, Stack, Text } from '@/components/common/chakra';
import SignInButton from '@/components/SignInButton';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getNextAuthServerSession();
  if (session?.user?.id) redirect('/home');

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: 'lg', sm: '3xl', md: '5xl' }}
            lineHeight={'110%'}
          >
            日々の思考を繋げて人生を豊かに <br />
            <Text as={'span'} color={'green.400'}>
              あなたの日記を始めましょう
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            日々の思考をつなげ、人生を豊かにするためのツール。私たちのアプリは、あなたが日々の経験を記録し、自己反省を深め、過去の思考を振り返ることを可能にします。あなたの成長と自己理解を支援するためのパーソナライズされた日記アプリケーションを始めてみましょう。
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <SignInButton />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
