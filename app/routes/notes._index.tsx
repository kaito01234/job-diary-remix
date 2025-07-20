import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { CalendarDays, Plus, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { prisma } from "~/lib/prisma";

export const meta: MetaFunction = () => {
  return [
    { title: "日記一覧 - Job Diary" },
    { name: "description", content: "過去の日記を確認しよう" },
  ];
};

export async function loader() {
  // TODO: 認証機能実装後にuserIdを取得する
  const userId = "temp-user-id"; // 仮のユーザーID

  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 20, // 最新20件
  });

  return json({ notes });
}

export default function NotesIndex() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            日記一覧
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            これまでの記録を振り返ろう
          </p>
        </div>
        <Link to="/notes/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新しい日記
          </Button>
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            まだ日記がありません
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            最初の日記を書いてみましょう
          </p>
          <Link to="/notes/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              日記を書く
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {new Date(note.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base line-clamp-3">
                  {note.content}
                </CardDescription>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString("ja-JP")} 作成
                  </span>
                  <Link to={`/notes/${note.id}`}>
                    <Button variant="outline" size="sm">
                      詳細を見る
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
