import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Deploy your project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Get started by creating a new project.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const NoteCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          📅 2025年7月20日
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          今日はRemixプロジェクトでStorybookのセットアップを完了しました。
          Vite設定の条件分岐によってRemixプラグインとの競合を解決できました。
        </CardDescription>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-400">
            2025/07/20 作成
          </span>
          <Button variant="outline" size="sm">
            詳細を見る
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};