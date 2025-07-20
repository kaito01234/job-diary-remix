import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InApp: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">ページコンテンツ</h1>
        <p>ヘッダーの下にページコンテンツが表示されます。</p>
      </main>
    </div>
  ),
};