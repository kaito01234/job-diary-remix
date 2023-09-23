import React from 'react';

import Footer from '@/(home)/footer';
import Header from '@/(home)/header';
import Main from '@/(home)/main';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
