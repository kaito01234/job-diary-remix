import { Button, Flex, Heading, Image, Stack, Text } from '@/components/common/chakra';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import { redirect } from 'next/navigation';
import SignInButton from './components/SignInButton';

export default async function Top() {
  const session = await getNextAuthServerSession();
  if (session?.user?.id) redirect('/home');

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              fontSize={{ base: '2xl', lg: '3xl' }}
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.400',
                zIndex: -1,
              }}
            >
              日々の思考を繋げて人生を豊かに
            </Text>
            <br />{' '}
            <Text fontSize={{ base: '2xl', lg: '3xl' }} color={'green.400'} as={'span'}>
              あなたの日記を始めましょう
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            日々の思考をつなげ、人生を豊かにするためのツール。私たちのアプリは、あなたが日々の経験を記録し、
            自己反省を深め、過去の思考を振り返ることを可能にします。あなたの成長と自己理解を支援するためのパーソナライズされた日記アプリケーションを始めてみましょう。
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <SignInButton />
            <Button as="s" rounded={'full'}>
              サインアップ
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
