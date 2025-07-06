import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft, Calendar, Save } from "lucide-react";
import { prisma } from "~/lib/prisma";

export const meta: MetaFunction = () => {
  return [
    { title: "新しい日記 - Job Diary" },
    { name: "description", content: "今日の仕事について記録しよう" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const comment = formData.get("comment") as string;

  // TODO: 認証機能実装後にuserIdを取得する
  const userId = "temp-user-id";

  // バリデーション
  const errors: { title?: string; date?: string; comment?: string; general?: string } = {};
  if (!title.trim()) errors.title = "タイトルを入力してください";
  if (!date) errors.date = "日付を選択してください";
  if (!comment.trim()) errors.comment = "コメントを入力してください";

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    await prisma.note.create({
      data: {
        title: title.trim(),
        date: new Date(date),
        comment: comment.trim(),
        userId,
      },
    });

    return redirect("/notes");
  } catch (error) {
    console.error("Note creation error:", error);
    return json({ 
      errors: { general: "保存に失敗しました。もう一度お試しください。" }
    }, { status: 500 });
  }
}

export default function NewNote() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // 今日の日付をデフォルトに設定
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/notes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            新しい日記
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            今日の仕事について記録しよう
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            日記の作成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-6">
            <div>
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                name="title"
                placeholder="今日の仕事について..."
                className="mt-1"
                required
              />
              {actionData?.errors && "title" in actionData.errors && actionData.errors.title && (
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
                defaultValue={today}
                className="mt-1"
                required
              />
              {actionData?.errors && "date" in actionData.errors && actionData.errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.date}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="comment">コメント</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="今日の仕事で学んだことや感じたことを記録しましょう..."
                className="mt-1 min-h-[150px]"
                required
              />
              {actionData?.errors && "comment" in actionData.errors && actionData.errors.comment && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.comment}
                </p>
              )}
            </div>

            {actionData?.errors && "general" in actionData.errors && actionData.errors.general && (
              <p className="text-red-500 text-sm">
                {actionData.errors.general}
              </p>
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
              <Link to="/notes">
                <Button type="button" variant="outline">
                  キャンセル
                </Button>
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}