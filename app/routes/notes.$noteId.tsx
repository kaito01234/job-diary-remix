import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { ArrowLeft, Edit, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { prisma } from "~/lib/prisma";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.note ? `${data.note.title} - Job Diary` : "日記 - Job Diary",
    },
    { name: "description", content: "日記の詳細を確認・編集しよう" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const noteId = params.noteId;
  if (!noteId) {
    throw new Response("Not Found", { status: 404 });
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ note });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const noteId = params.noteId;
  if (!noteId) {
    throw new Response("Not Found", { status: 404 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "delete") {
    await prisma.note.delete({
      where: { id: noteId },
    });
    return redirect("/notes");
  }

  if (intent === "update") {
    const date = formData.get("date") as string;
    const content = formData.get("content") as string;
    const tagsInput = formData.get("tags") as string;

    // バリデーション
    const errors: {
      date?: string;
      content?: string;
      general?: string;
    } = {};
    if (!date) errors.date = "日付を選択してください";
    if (!content.trim()) errors.content = "内容を入力してください";

    if (Object.keys(errors).length > 0) {
      return json({ errors }, { status: 400 });
    }

    try {
      // タグを解析（カンマ区切り、重複除去）
      const tags = tagsInput
        ? [...new Set(
            tagsInput
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          )]
        : [];

      // トランザクションでNote更新とタグ関連付けを実行
      await prisma.$transaction(async (prisma) => {
        // Noteの基本情報を更新
        await prisma.note.update({
          where: { id: noteId },
          data: {
            title: null,
            date: new Date(date),
            content: content.trim(),
          },
        });

        // 既存のタグ関連付けを削除
        await prisma.noteTag.deleteMany({
          where: { noteId },
        });

        // 新しいタグ関連付けを作成
        if (tags.length > 0) {
          await prisma.noteTag.createMany({
            const tagAssociations = [];
            for (const tagName of tags) {
              // タグが存在しない場合は作成
              const tag = await prisma.tag.upsert({
                where: { name: tagName },
                update: {},
                create: { name: tagName },
              });
              tagAssociations.push({
                noteId,
                tagId: tag.id,
              });
            }
            data: tagAssociations,
          });
        }
      });

      return json({ success: true });
    } catch (error) {
      console.error("Note update error:", error);
      return json(
        {
          errors: { general: "更新に失敗しました。もう一度お試しください。" },
        },
        { status: 500 },
      );
    }
  }

  return json({ errors: { general: "無効な操作です。" } }, { status: 400 });
}

export default function NoteDetail() {
  const { note } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/notes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {new Date(note.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            size="sm"
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "編集終了" : "編集"}
          </Button>
          <Form method="post" className="inline">
            <input type="hidden" name="intent" value="delete" />
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                if (!confirm("この日記を削除しますか？")) {
                  e.preventDefault();
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              削除
            </Button>
          </Form>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>日記の詳細</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form method="post" className="space-y-6">
              <input type="hidden" name="intent" value="update" />

              <div>
                <Label htmlFor="date">日付</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={formatDate(note.date)}
                  className="mt-1"
                  required
                />
                {actionData?.errors &&
                  "date" in actionData.errors &&
                  actionData.errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.date}
                    </p>
                  )}
              </div>

              <div>
                <Label htmlFor="content">内容</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={note.content}
                  className="mt-1 min-h-[150px]"
                  required
                />
                {actionData?.errors &&
                  "content" in actionData.errors &&
                  actionData.errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.content}
                    </p>
                  )}
              </div>

              <div>
                <Label htmlFor="tags">タグ（カンマ区切り）</Label>
                <Input
                  id="tags"
                  name="tags"
                  defaultValue={note.tags.map((noteTag) => noteTag.tag.name).join(", ") || ""}
                  placeholder="例: 開発, フロントエンド, React"
                  className="mt-1"
                />
              </div>

              {actionData?.errors &&
                "general" in actionData.errors &&
                actionData.errors.general && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.general}
                  </p>
                )}

              {actionData?.success && (
                <p className="text-green-500 text-sm">更新しました！</p>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "保存中..." : "保存する"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  キャンセル
                </Button>
              </div>
            </Form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  日付
                </p>
                <p className="text-base">
                  {new Date(note.date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  コメント
                </p>
                <p className="text-base whitespace-pre-line">{note.content}</p>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    タグ
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((noteTag) => (
                      <span
                        key={noteTag.tagId}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {noteTag.tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  作成日: {new Date(note.createdAt).toLocaleDateString("ja-JP")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
