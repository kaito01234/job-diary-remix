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
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const content = formData.get("content") as string;

    // バリデーション
    const errors: {
      title?: string;
      date?: string;
      content?: string;
      general?: string;
    } = {};
    if (!title.trim()) errors.title = "タイトルを入力してください";
    if (!date) errors.date = "日付を選択してください";
    if (!content.trim()) errors.content = "内容を入力してください";

    if (Object.keys(errors).length > 0) {
      return json({ errors }, { status: 400 });
    }

    try {
      await prisma.note.update({
        where: { id: noteId },
        data: {
          title: title.trim(),
          date: new Date(date),
          content: content.trim(),
        },
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {note.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {new Date(note.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={note.title || ""}
                  className="mt-1"
                  required
                />
                {actionData?.errors &&
                  "title" in actionData.errors &&
                  actionData.errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.title}
                    </p>
                  )}
              </div>

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
