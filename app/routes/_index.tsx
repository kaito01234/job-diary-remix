import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Calendar, FileText, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "まめめも - マメにメモする習慣" },
    { name: "description", content: "日々の仕事をマメにメモして、振り返りや経歴書作成に活用" },
  ];
};

export default function Index() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              メモを書く
            </CardTitle>
            <CardDescription>今やっていることをサッとメモ</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notes/new">
              <Button className="w-full">メモを書く</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              メモ一覧
            </CardTitle>
            <CardDescription>過去のメモを振り返る</CardDescription>
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
              日記・経歴書生成
            </CardTitle>
            <CardDescription>メモから自動生成（AI機能）</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              近日公開
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
