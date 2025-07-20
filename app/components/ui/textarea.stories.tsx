import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from './label';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a sample text in the textarea.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-[100px]"
      />
    </div>
  ),
};

export const NoteContent: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <Label htmlFor="note-content">日記の内容</Label>
      <Textarea
        id="note-content"
        placeholder="今日の仕事で学んだことや感じたことを記録しましょう..."
        className="min-h-[150px]"
        defaultValue="今日はRemixプロジェクトでStorybookのセットアップを行いました。最初はViteとRemixプラグインの競合でエラーが発生しましたが、条件分岐を使って解決できました。"
      />
    </div>
  ),
};