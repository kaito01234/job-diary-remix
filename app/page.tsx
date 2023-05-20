import { useState, useEffect, ChangeEvent } from 'react';
import { Heading } from './common/chakra';
import ArticleList from './components/ArticleList';

interface DataType {
  key: string;
  id: number;
  content: string;
  createdAt: string;
}

async function getArticles() {
  const [content, setContent] = useState('');
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes');
      const notes = await response.json();
      setDataSource(notes);
    };
    fetchNotes();
  }, []);

  const res = await fetch('http://localhost:3000/api/articles', {
    cache: 'no-store',
  });

  // エラーハンドリングを行うことが推奨されている
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  const data = await res.json();

  return data.articles as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <Heading as="h1" mb={4}>
        新着記事
      </Heading>
      <ArticleList articles={articles} />
    </div>
  );
}
