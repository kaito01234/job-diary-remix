import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Calendar, FileText, Plus } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Diary - 仕事日記" },
    { name: "description", content: "あなたの仕事の記録を残そう" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Job Diary
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          あなたの仕事の記録を残そう
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              新しい日記
            </CardTitle>
            <CardDescription>
              今日の仕事について記録しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notes/new">
              <Button className="w-full">
                日記を書く
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              日記一覧
            </CardTitle>
            <CardDescription>
              過去の日記を見返しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notes">
              <Button variant="outline" className="w-full">
                一覧を見る
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              今月の振り返り
            </CardTitle>
            <CardDescription>
              月単位での振り返りができます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              近日公開
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          継続的な記録で成長を実感しよう
        </p>
      </div>
    </div>
  );
}

